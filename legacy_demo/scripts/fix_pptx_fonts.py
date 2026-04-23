from __future__ import annotations

import shutil
import tempfile
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET


P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main"
A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
NS = {"p": P_NS, "a": A_NS}

ET.register_namespace("a", A_NS)
ET.register_namespace("p", P_NS)

TITLE_FACE = "Arial Rounded MT Bold"
BODY_FACE = "Trebuchet MS"
SCRIPT_FACE = "Segoe Print"
SYMBOL_FACE = "Segoe UI Symbol"

SCRIPT_TEXTS = {
    "A",
    "I",
    "Tương lai",
    "không đợi con lớn.",
    "Để lớn lên bình yên",
    "Để vun đắp yêu thương",
}

SYMBOL_TEXTS = {
    "◔",
    "✺",
    "▣",
    "♡",
    "☹",
    "◎",
    "♥",
    "☼",
    "⚘",
    "◌",
    "☆",
}


def detect_font(text: str) -> str:
    value = (text or "").strip()
    if not value:
        return BODY_FACE
    if value in SYMBOL_TEXTS:
        return SYMBOL_FACE
    if value in SCRIPT_TEXTS:
        return SCRIPT_FACE
    if value.isdigit():
        return TITLE_FACE
    if value == "HOOK" or value.isupper():
        return TITLE_FACE
    return BODY_FACE


def force_typeface(rpr: ET.Element, font_name: str) -> None:
    for tag in ("latin", "ea", "cs", "sym"):
        child = rpr.find(f"{{{A_NS}}}{tag}")
        if child is not None:
            rpr.remove(child)
    for tag in ("latin", "ea", "cs"):
        ET.SubElement(rpr, f"{{{A_NS}}}{tag}", {"typeface": font_name})
    if font_name == SYMBOL_FACE:
        ET.SubElement(rpr, f"{{{A_NS}}}sym", {"typeface": font_name})


def patch_slide_xml(path: Path) -> None:
    tree = ET.parse(path)
    root = tree.getroot()

    for shape in root.findall(".//p:sp", NS):
        texts = [node.text or "" for node in shape.findall(".//a:t", NS)]
        first_text = next((text.strip() for text in texts if text.strip()), "")
        if not first_text:
            continue

        font_name = detect_font(first_text)
        for tag in ("defRPr", "rPr", "endParaRPr"):
            for node in shape.findall(f".//a:{tag}", NS):
                force_typeface(node, font_name)

    tree.write(path, encoding="utf-8", xml_declaration=True)


def patch_pptx(pptx_path: Path) -> None:
    temp_dir = Path(tempfile.mkdtemp(prefix="pptx-font-fix-"))
    try:
        with zipfile.ZipFile(pptx_path) as archive:
            archive.extractall(temp_dir)

        slides_dir = temp_dir / "ppt" / "slides"
        for slide_xml in sorted(slides_dir.glob("slide*.xml")):
            patch_slide_xml(slide_xml)

        temp_pptx = pptx_path.with_suffix(".patched.pptx")
        with zipfile.ZipFile(temp_pptx, "w", zipfile.ZIP_DEFLATED) as archive:
            for file_path in sorted(temp_dir.rglob("*")):
                if file_path.is_file():
                    archive.write(file_path, file_path.relative_to(temp_dir).as_posix())

        shutil.move(str(temp_pptx), str(pptx_path))
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


if __name__ == "__main__":
    target = Path(r"D:\MyProject\Slide_ProMax\outputs\watercolor-five-editable\output.pptx")
    patch_pptx(target)
    print(target)
