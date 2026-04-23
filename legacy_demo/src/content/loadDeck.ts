import manifestJson from "../../content/manifest.json";
import assetManifestJson from "../../ASSET_MANIFEST_SAMPLE.json";
import characterBible from "./characterBible";
import deckData from "./deck";
import {
  assetManifestSchema,
  characterBibleSchema,
  deckManifestSchema,
  deckSchema,
  type AssetManifest,
  type CharacterBible,
  type Deck,
  type DeckManifest
} from "./schema";

function assertUniqueSlides(deck: Deck): void {
  const ids = new Set<string>();
  const numbers = new Set<number>();

  for (const slide of deck.slides) {
    if (ids.has(slide.id)) {
      throw new Error(`Duplicate slide id: ${slide.id}`);
    }

    if (numbers.has(slide.slideNumber)) {
      throw new Error(`Duplicate slide number: ${slide.slideNumber}`);
    }

    ids.add(slide.id);
    numbers.add(slide.slideNumber);
  }
}

function assertSlideGrammar(deck: Deck): void {
  let streakVariant = "";
  let streakCount = 0;

  for (const slide of deck.slides) {
    if (slide.layoutVariant === streakVariant) {
      streakCount += 1;
    } else {
      streakVariant = slide.layoutVariant;
      streakCount = 1;
    }

    if (streakCount > 2) {
      throw new Error(
        `Layout rhythm violation: "${slide.layoutVariant}" appears more than twice consecutively.`
      );
    }
  }
}

function mergeCharacterBible(deck: Deck, characterBibleData: CharacterBible): Deck {
  const directionIndex = new Map(
    characterBibleData.slideDirections.map(({ slideId, ...direction }) => [slideId, direction])
  );

  return {
    ...deck,
    slides: deck.slides.map((slide) => {
      const direction = directionIndex.get(slide.id);

      if (!direction) {
        throw new Error(`Missing character direction for slide "${slide.id}".`);
      }

      return {
        ...slide,
        characterDirection: direction
      };
    })
  };
}

function assertAssetManifestContract(assetManifest: AssetManifest): void {
  const allowedExtensions = new Set(["webp", "png", "svg"]);
  const basePath = `${assetManifest.assetBasePath}/`;

  for (const slide of assetManifest.slides) {
    const src = slide.illustration.src;

    if (!src) {
      throw new Error(`Asset manifest entry "${slide.id}" is missing illustration.src.`);
    }

    if (!src.startsWith(basePath)) {
      throw new Error(
        `Asset manifest entry "${slide.id}" must use "${assetManifest.assetBasePath}" as its base path.`
      );
    }

    const fileParts = src.split("/");
    const fileName = fileParts[fileParts.length - 1];

    if (!fileName || !fileName.includes(".")) {
      throw new Error(`Asset manifest entry "${slide.id}" has an invalid illustration.src value.`);
    }

    const extensionParts = fileName.split(".");
    const extension = extensionParts[extensionParts.length - 1]?.toLowerCase();
    const stem = fileName.slice(0, fileName.lastIndexOf("."));

    if (!extension || !allowedExtensions.has(extension)) {
      throw new Error(
        `Asset manifest entry "${slide.id}" uses unsupported extension ".${extension ?? ""}".`
      );
    }

    if (slide.illustration.asset && stem !== slide.illustration.asset) {
      throw new Error(
        `Asset manifest entry "${slide.id}" must keep illustration.asset in sync with illustration.src.`
      );
    }
  }
}

function mergeAssetManifest(deck: Deck, assetManifest: AssetManifest): Deck {
  const assetIndex = new Map(assetManifest.slides.map((slide) => [slide.id, slide]));

  return {
    ...deck,
    slides: deck.slides.map((slide) => {
      if (!slide.assetManifestId) {
        return slide;
      }

      const assetSlide = assetIndex.get(slide.assetManifestId);

      if (!assetSlide) {
        throw new Error(`Missing asset manifest entry for "${slide.assetManifestId}".`);
      }

      return {
        ...slide,
        illustration: {
          ...slide.illustration,
          ...assetSlide.illustration
        }
      };
    })
  };
}

const manifest = deckManifestSchema.parse(manifestJson);
const parsedDeck = deckSchema.parse(deckData);
const assetManifest = assetManifestSchema.parse(assetManifestJson);
const parsedCharacterBible = characterBibleSchema.parse(characterBible);
assertAssetManifestContract(assetManifest);
const deckWithCharacterDirections = mergeCharacterBible(parsedDeck, parsedCharacterBible);
const deck = mergeAssetManifest(deckWithCharacterDirections, assetManifest);

assertUniqueSlides(deck);
assertSlideGrammar(deck);

export function loadDeck(): {
  manifest: DeckManifest;
  deck: Deck;
} {
  return {
    manifest,
    deck: {
      ...deck,
      slides: [...deck.slides].sort((left, right) => left.slideNumber - right.slideNumber)
    }
  };
}
