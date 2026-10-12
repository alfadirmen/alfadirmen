import hotelDoorwayImg from '../assets/images/studio_preview_hotel_doorway_1791164574349.jpg';
import penthouseSuiteImg from '../assets/images/studio_preview_penthouse_suite_1791164587262.jpg';
import modernCorridorImg from '../assets/images/studio_preview_modern_corridor_1791164598182.jpg';

export interface GalleryPoseItem {
  poseNumber: number;
  poseTitleTr: string;
  poseTitleEn: string;
  promptEn: string;
  descriptionTr: string;
}

export interface AnchorCharacterPreset {
  id: string;
  nameTr: string;
  tagEn: string;
  previewImage: string;
  hairId: string;
  faceAndSkinEn: string;
  faceAndSkinTr: string;
  shortCompressedEn: string;
}

export type VideoFpsOption = 24 | 30 | 60;
export type VideoSpeedOption = 0.5 | 1 | 2;
export type VideoModelPlatform = 'runway' | 'kling' | 'luma';
export type LightingModeId = 'dogal' | 'sicak' | 'soguk' | 'dramatik';
export type AdvancedPromptFilterId = 'fotogercekci' | 'cinematic' | 'sanatsal';
export type KeywordWeightBoost = 'standart' | 'guclu' | 'maksimum';

export interface WeightedKeywordToken {
  tokenEn: string;
  labelTr: string;
  baseWeight: number;
  effectiveWeight: string;
}

export interface AdvancedPromptFilterSpec {
  id: AdvancedPromptFilterId;
  labelTr: string;
  badgeTr: string;
  toneTitleTr: string;
  toneDescriptionTr: string;
  weightBoost: KeywordWeightBoost;
  weightBoostLabelTr: string;
  weightedTokens: WeightedKeywordToken[];
  filterDirectiveEn: string;
  shortFilterEn: string;
  filterDirectiveTr: string;
}

export interface EnvironmentLightingHarmony {
  modeId: LightingModeId;
  modeLabelTr: string;
  kelvinBadge: string;
  isRecommendedForRoom: boolean;
  recommendedModeId: LightingModeId;
  recommendedModeLabelTr: string;
  roomHarmonyNoteTr: string;
  autoLightingPromptEn: string;
  autoLightingScenarioTr: string;
  shortLightingEn: string;
  lightingQualityScore: number;
}

export interface ConceptQualityPoint {
  conceptIndex: number;
  code: string;
  settingId: string;
  shortTitleTr: string;
  fullTitleTr: string;
  lightingModeId: LightingModeId;
  lightingLabelTr: string;
  kelvinBadge: string;
  score: number;
  skinScore: number;
  flashScore: number;
  motionScore: number;
  isCurrent: boolean;
}

export interface ModelDifferentiationSpec {
  id: VideoModelPlatform;
  nameTr: string;
  badgeTr: string;
  architectureTr: string;
  descriptionTr: string;
  jargonTerms: {
    term: string;
    value: string;
    explanationTr: string;
  }[];
  technicalBlockEn: string;
  shortTechnicalEn: string;
}

export interface CameraPathPhase {
  timeRange: string;
  phaseTitleTr: string;
  cameraPathTr: string;
  actionTr: string;
}

export interface MissingDetailWarning {
  id: string;
  titleTr: string;
  descriptionTr: string;
  actionLabelTr: string;
  fixType:
    | 'enable_camera_path'
    | 'fill_line3'
    | 'switch_fps_60'
    | 'inject_prompt_detail';
  snippetEn?: string;
}

export interface VisualQualityAnalysis {
  overallScore: number;
  skinNaturalnessScore: number;
  phoneFlashRealismScore: number;
  verificationCardScore: number;
  cameraPathMotionScore: number;
  summaryTr: string;
  missingDetails: MissingDetailWarning[];
  isAiAnalyzed?: boolean;
}

export interface PromptConflictResolutionOption {
  id: string;
  labelTr: string;
  actionType:
    | 'change_hair'
    | 'change_wardrobe'
    | 'change_setting'
    | 'change_turn'
    | 'apply_harmony_patch';
  targetValue?: string;
  harmonyPatchEn?: string;
  harmonyPatchTr?: string;
}

export interface PromptConflictWarning {
  id: string;
  severity: 'high' | 'medium';
  categoryTr: string;
  conflictingItemsTr: string;
  titleTr: string;
  descriptionTr: string;
  recommendationTr: string;
  harmonyPatchEn: string;
  harmonyPatchTr: string;
  resolutions: PromptConflictResolutionOption[];
}

export interface QuickRepairDiagnosticStep {
  id: string;
  stepNumber: number;
  dimensionTr: string;
  status: 'optimal' | 'conflict' | 'suboptimal';
  currentStateTr: string;
  targetActionTr: string;
  scoreGain: number;
}

export interface BatchReconciliationPlan {
  conflictCount: number;
  totalIssuesCount: number;
  estimatedScoreBefore: number;
  estimatedScoreAfterHarmony: number;
  estimatedScoreAfterSmartPreset: number;
  unifiedHarmonyTitleTr: string;
  unifiedHarmonyDescriptionTr: string;
  unifiedHarmonyPatchEn: string;
  unifiedHarmonyPatchTr: string;
  affectedDimensionsTr: string[];
  diagnosticSteps: QuickRepairDiagnosticStep[];
  smartPresetTarget: {
    hairId: string;
    wardrobeId: string;
    settingId: string;
    turnAngle: 'soft' | '180' | '360';
    lightingMode: LightingModeId;
    fps: VideoFpsOption;
    cameraPathOptimized: boolean;
    motionIntensity: number;
    keywordWeightBoost: KeywordWeightBoost;
    verificationHeader: string;
    verificationDate: string;
    verificationWebsite: string;
    summaryTr: string;
    changesMadeTr: string[];
  };
}

export interface WaveformTimelineBar {
  index: number;
  timeSec: number;
  amplitude: number;
  phaseIndex: 0 | 1 | 2;
  phaseLabelTr: string;
  isPeakMoment: boolean;
}

export type CanonicalSceneNoteCategory = 'kamera' | 'isik' | 'hareket' | 'ses';

export type SceneNoteCategory =
  | CanonicalSceneNoteCategory
  | 'karakter'
  | 'dogrulama_karti'
  | 'isik_flas'
  | 'gecis_ritim';

export type SceneAudioSfxSynthType =
  | 'focus-click'
  | 'warm-pulse'
  | 'heel-whoosh'
  | 'flash-transient';

export interface TimelineSceneNote {
  id: string;
  sceneOrder: number;
  titleTr: string;
  startSec: number;
  endSec: number;
  category: SceneNoteCategory;
  categoryLabelTr: string;
  colorHex: string;
  cameraNoteTr: string;
  descriptionTr: string;
  promptDirectiveEn: string;
  selectedSfxPresetId?: 'auto' | SceneAudioSfxSynthType;
  customTempoBpm?: number;
}

export interface SceneNoteQuickTemplate {
  id: string;
  labelTr: string;
  defaultTitleTr: string;
  category: CanonicalSceneNoteCategory;
  cameraNoteTr: string;
  descriptionTr: string;
  directiveEn: string;
}

export type ActionIntensityLevel = 'dusuk' | 'dengeli' | 'yuksek' | 'kritik';

export interface SceneAudioWaveformBar {
  index: number;
  timeSec: number;
  relativePct: number;
  amplitude: number;
  dbFs: number;
  isBeatMarker: boolean;
  isTransientPeak: boolean;
  phaseLabelTr: string;
  barColorHex: string;
}

export interface SceneAudioTempoRecommendation {
  intensityPct: number;
  level: ActionIntensityLevel;
  levelLabelTr: string;
  colorHex: string;
  sfxTitleTr: string;
  sfxDetailTr: string;
  tempoBpm: number;
  tempoLabelTr: string;
  rhythmCueTr: string;
  promptAudioCueEn: string;
  synthType: SceneAudioSfxSynthType;
  peakDbFs: number;
  avgLufs: number;
  beatIntervalSec: number;
  beatCountInClip: number;
  soundwaveBars: SceneAudioWaveformBar[];
}

export interface WaveformActionIntensityBar {
  index: number;
  timeSec: number;
  baseAmplitude: number;
  actionIntensity: number;
  transitionSpike: number;
  isInsideSelectedRange: boolean;
  isTransitionBoundary: boolean;
  boundaryZone: 'in-ramp' | 'core' | 'out-ramp' | 'outside';
  level: ActionIntensityLevel;
  levelLabelTr: string;
  colorHex: string;
}

export interface SceneTransitionIntensityProfile {
  selectedStartSec: number;
  selectedEndSec: number;
  clipDurationSec: number;
  overallIntensityPct: number;
  entryTransitionSeverityPct: number;
  coreActionDensityPct: number;
  exitTransitionSeverityPct: number;
  peakTimeSec: number;
  peakIntensityPct: number;
  dominantLevel: ActionIntensityLevel;
  dominantLevelLabelTr: string;
  dominantColorHex: string;
  transitionDiagnosticTr: string;
  promptTransitionDirectiveEn: string;
  audioTempo: SceneAudioTempoRecommendation;
  bars: WaveformActionIntensityBar[];
}

export interface ContentPackage {
  id: string;
  code: string;
  packageTitleTr: string;
  previewImage: string;
  anchorId?: string;
  hairId: string;
  wardrobeId: string;
  settingId: string;
  turnAngle: 'soft' | '180' | '360';
  fps: VideoFpsOption;
  videoSpeed?: VideoSpeedOption;
  lightingMode?: LightingModeId;
  advancedFilterId?: AdvancedPromptFilterId;
  keywordWeightBoost?: KeywordWeightBoost;
  cameraPathOptimized: boolean;
  verificationCardStyleId: string;
  motionIntensity: number;
  cameraSpeedId: string;
  lightingMoodId: string;
  focalLength: string;
  colorTemp: string;
  characterAnchorEn: string;
  characterAnchorTr: string;
  // Component 1: Video Production Prompt (Runway / Kling / Luma + Compressed Variants)
  videoPrompt: {
    masterEn: string;
    runwayEn: string;
    klingEn: string;
    lumaEn: string;
    compressedMasterEn: string;
    compressedRunwayEn: string;
    compressedKlingEn: string;
    compressedLumaEn: string;
    negativeEn: string;
    scenarioTr: string;
  };
  // Component 2: Matching Verification Photo Prompt (Midjourney / DALL-E / Flux)
  verificationPhotoPrompt: {
    midjourneyEn: string;
    dalleEn: string;
    descriptionTr: string;
  };
  // Component 3: 6 Normal Gallery Poses (Without Verification Paper) + Combined Multi-Pose Showcase
  multiPoseShowcasePrompt: {
    promptEn: string;
    descriptionTr: string;
  };
  galleryPrompts: GalleryPoseItem[];
  createdAt: string;
  isAiGenerated?: boolean;
}

export interface BilingualStudioOption {
  id: string;
  labelTr: string;
  detailTr: string;
  promptEn: string;
  promptTr: string;
  shortSpec: string;
}

export const VERIFICATION_CARD_STYLES: BilingualStudioOption[] = [
  {
    id: 'classic-white-paper',
    labelTr: 'Classic White Paper (Klasik Beyaz A4 Kağıt)',
    detailTr: 'Göğüs hizasında tutulan, mat dokulu klasik beyaz A4 kağıt üzerinde 3 satırlı el yazısı',
    promptEn: 'a crisp horizontal matte white A4 paper sheet with natural paper grain',
    promptTr: 'klasik mat beyaz A4 doğrulama kağıdı',
    shortSpec: 'Classic White Paper',
  },
  {
    id: 'digital-holographic-display',
    labelTr: 'Digital Holographic Display (Dijital Holografik Şeffaf Plaka)',
    detailTr: 'Elde tutulan çerçevesiz şeffaf akrilik/holografik cam plaka üzerinde parlayan 3 satırlı el yazısı metin',
    promptEn: 'a sleek frameless translucent glass digital holographic display card emitting soft warm-white luminous handwritten script',
    promptTr: 'ışıklı 3 satırlı el yazısı yansıtan şeffaf dijital holografik doğrulama plakası',
    shortSpec: 'Digital Holographic Display',
  },
  {
    id: 'handwritten-sticky-note',
    labelTr: 'Handwritten Note on Sticky Note (Sarı Post-it Yapışkanlı Not Kağıdı)',
    detailTr: 'Parmak uçlarıyla göğüs hizasında tutulan pastel sarı kare Post-it not kağıdı üzerinde 3 satırlı kalem yazısı',
    promptEn: 'a matte pastel-yellow square sticky note card held neatly between her fingertips with bold dark marker handwriting',
    promptTr: 'parmak uçlarında tutulan pastel sarı Post-it (yapışkanlı not kağıdı)',
    shortSpec: 'Handwritten Sticky Note',
  },
  {
    id: 'luxury-cream-cardstock',
    labelTr: 'Luxury Cream Cardstock (Dokulu Lüks Krem Karton)',
    detailTr: 'Kalın pamuk dokulu lüks krem rengi kart üzerinde 3 satırlı kaligrafik el yazısı',
    promptEn: 'a heavy cotton-textured cream luxury cardstock plaque with crisp dark ink handwritten calligraphy',
    promptTr: 'kalın dokulu lüks krem doğrulama kartı',
    shortSpec: 'Luxury Cream Cardstock',
  },
];

export const CAMERA_SPEED_OPTIONS: BilingualStudioOption[] = [
  {
    id: 'locked-static',
    labelTr: 'Sabit Tripod (Locked-Off Static · 0x)',
    detailTr: 'Referans doğrulama videolarındaki gibi sıfır kamera sarsıntılı sabit kadraj',
    promptEn: 'static locked-off tripod camera (0x camera speed, zero camera pan or shake)',
    promptTr: 'sabit tripod kamera açısı (0x kamera hızı, sıfır sarsıntı)',
    shortSpec: 'Static 0x',
  },
  {
    id: 'ultra-slow-push',
    labelTr: 'Ultra Yavaş Yakınlaşma (Micro Push-In · 0.25x)',
    detailTr: 'Kağıt okunabilirliğini bozmadan modele doğru çok hafif sinematik yaklaşma',
    promptEn: 'ultra-slow imperceptible dolly push-in (0.25x camera speed, smooth gimbal stabilization)',
    promptTr: 'ultra yavaş ve sarsıntısız ileri kamera yaklaşması (0.25x hız)',
    shortSpec: 'Slow Push 0.25x',
  },
  {
    id: 'smooth-cinematic-dolly',
    labelTr: 'Akıcı Sinematik Dolly (Smooth Arc · 0.5x)',
    detailTr: 'Modelin dönüş hareketiyle uyumlu yumuşak yarım yay kamera hareketi',
    promptEn: 'smooth cinematic dolly arc movement (0.5x medium-slow camera speed, fluid tracking)',
    promptTr: 'modelin dönüşüyle uyumlu akıcı sinematik dolly hareketi (0.5x hız)',
    shortSpec: 'Cinematic 0.5x',
  },
  {
    id: 'dynamic-handheld-reel',
    labelTr: 'Dinamik Sosyal Medya Takibi (Dynamic Tracking · 1.0x)',
    detailTr: 'TikTok ve Reels videoları için enerjik ve organik kamera takibi',
    promptEn: 'dynamic stabilized handheld tracking motion (1.0x responsive camera speed)',
    promptTr: 'dinamik ve enerjik sosyal medya kamera takibi (1.0x hız)',
    shortSpec: 'Dynamic 1.0x',
  },
];

export const LIGHTING_MOOD_OPTIONS: BilingualStudioOption[] = [
  {
    id: 'warm-golden-tungsten',
    labelTr: 'Sıcak Altın Tungsten (3200K Warm Luxury)',
    detailTr: 'Lüks otel aplikleri ve sıcak altın kontur (rim) aydınlatması',
    promptEn:
      'warm 3200K golden tungsten ambient lighting with soft rim highlights on hair and natural skin subsurface scattering',
    promptTr: '3200K sıcak altın tungsten otel aydınlatması ve saçlarda yumuşak kontur ışığı',
    shortSpec: '3200K Warm Tungsten',
  },
  {
    id: 'crisp-neutral-indoor',
    labelTr: 'Net Doğrulama Işığı (4200K Crisp Studio Indoor)',
    detailTr: 'Kağıt üzerindeki el yazısını ve cilt dokusunu gölgesiz gösteren net iç mekan ışığı',
    promptEn:
      'clean 4200K neutral-warm studio indoor illumination providing shadow-free legibility on the white verification paper and true-to-life skin tones',
    promptTr: '4200K gölgesiz ve net iç mekan doğrulama aydınlatması',
    shortSpec: '4200K Crisp Indoor',
  },
  {
    id: 'moody-chiaroscuro',
    labelTr: 'Loş Sinematik Kontrast (2800K Moody Lounge)',
    detailTr: 'Koyu perdeler önünde derin gölgeli ve atmosferik gece aydınlatması',
    promptEn:
      'moody 2800K low-key chiaroscuro bedroom lamp lighting with rich atmospheric shadows and warm specular highlights on satin and high heels',
    promptTr: '2800K loş ve derin kontrastlı sinematik gece aydınlatması',
    shortSpec: '2800K Moody Low-Key',
  },
  {
    id: 'soft-diffused-daylight',
    labelTr: 'Yumuşak Tül Perde Gün Işığı (5000K Soft Daylight)',
    detailTr: 'Pencereden süzülen doğal ve ferah sabah/öğleden sonra ışığı',
    promptEn:
      'soft 5000K diffused natural window daylight filtering through sheer curtains with airy editorial contrast',
    promptTr: '5000K tül perdelerden süzülen yumuşak doğal gün ışığı',
    shortSpec: '5000K Soft Daylight',
  },
];

export const LIGHTING_MODE_OPTIONS: {
  id: LightingModeId;
  labelTr: string;
  shortLabelTr: string;
  kelvin: string;
  summaryTr: string;
}[] = [
  {
    id: 'dogal',
    labelTr: 'Doğal (4500K Ev & Flaş)',
    shortLabelTr: 'Doğal',
    kelvin: '4500K',
    summaryTr: 'Dengeli ev içi ortam ışığı + patlamayan doğal telefon flaşı dolgusu',
  },
  {
    id: 'sicak',
    labelTr: 'Sıcak (2900K Amber & Flaş)',
    shortLabelTr: 'Sıcak',
    kelvin: '2900K',
    summaryTr: 'Sıcak gece lambası/aplik amber yansıması + yumuşak flaş geçişi',
  },
  {
    id: 'soguk',
    labelTr: 'Soğuk (5600K Kristal LED)',
    shortLabelTr: 'Soğuk',
    kelvin: '5600K',
    summaryTr: 'Net soğuk beyaz ayna/banyo LED aydınlatması + keskin telefon flaşı',
  },
  {
    id: 'dramatik',
    labelTr: 'Dramatik (2600K Kontrast)',
    shortLabelTr: 'Dramatik',
    kelvin: '2600K',
    summaryTr: 'Derin loş oda gölgeleri (low-key chiaroscuro) + modeli öne çıkaran odaklı flaş',
  },
];

export function getDefaultLightingModeForSetting(settingId: string): LightingModeId {
  switch (settingId) {
    case 'casual-everyday-home':
      return 'dogal';
    case 'modern-wood-doorway':
      return 'sicak';
    case 'luxury-hotel-suite-drapes':
      return 'dramatik';
    case 'dressing-room-vanity-mirror':
      return 'sicak';
    case 'italian-marble-bathroom':
      return 'soguk';
    default:
      return 'dogal';
  }
}

export function getEnvironmentLightingHarmony(
  settingId: string,
  requestedMode?: LightingModeId
): EnvironmentLightingHarmony {
  const recommendedModeId = getDefaultLightingModeForSetting(settingId);
  const modeId: LightingModeId = requestedMode || recommendedModeId;
  const isRecommendedForRoom = modeId === recommendedModeId;

  const modeMeta =
    LIGHTING_MODE_OPTIONS.find((m) => m.id === modeId) || LIGHTING_MODE_OPTIONS[0];
  const recMeta =
    LIGHTING_MODE_OPTIONS.find((m) => m.id === recommendedModeId) || LIGHTING_MODE_OPTIONS[0];

  const roomProfileMap: Record<
    string,
    {
      roomShortTr: string;
      surfaceEn: string;
      surfaceTr: string;
    }
  > = {
    'casual-everyday-home': {
      roomShortTr: 'Günlük Ev Yatak Odası',
      surfaceEn:
        'matte domestic bedroom walls, neutral cotton bed linens, and subtle full-length mirror edge bounce',
      surfaceTr: 'mat ev duvarları, pamuklu yatak tekstili ve boy aynası kenar yansıması',
    },
    'modern-wood-doorway': {
      roomShortTr: 'Ahşap Oda Kapısı & Koridor',
      surfaceEn:
        'warm-grained wooden doorframe, hallway mirror reflection, and narrow domestic corridor depth falloff',
      surfaceTr: 'ahşap kapı dokusu, antre aynası ve ev koridoru derinlik gölgesi',
    },
    'luxury-hotel-suite-drapes': {
      roomShortTr: 'Loş Yatak Odası & Koyu Perdeler',
      surfaceEn:
        'heavy dark fabric drapes that absorb stray spill light, rumpled white bedsheets, and deep ambient room shadows',
      surfaceTr: 'ışığı emen koyu perdeler, beyaz yatak örtüsü ve derin gece odası gölgeleri',
    },
    'dressing-room-vanity-mirror': {
      roomShortTr: 'Ev Giyinme Köşesi & Boy Aynası',
      surfaceEn:
        'vanity mirror glass with 15-degree off-axis anti-glare flash angle and warm wooden parquet floor bounce',
      surfaceTr: 'parlama önleyici 15° açılı boy aynası yüzeyi ve sıcak ahşap parke yansıması',
    },
    'italian-marble-bathroom': {
      roomShortTr: 'Ev Banyosu & Ayna Önü',
      surfaceEn:
        'natural ceramic bathroom tiles, vanity mirror edge illumination, and controlled specular flash diffusion',
      surfaceTr: 'doğal banyo seramikleri, ayna önü aydınlatması ve dengeli flaş kırılımı',
    },
  };

  const roomProfile = roomProfileMap[settingId] || roomProfileMap['casual-everyday-home'];

  if (modeId === 'dogal') {
    return {
      modeId: 'dogal',
      modeLabelTr: modeMeta.shortLabelTr,
      kelvinBadge: '4500K Doğal Ev + Ham Flaş',
      isRecommendedForRoom,
      recommendedModeId,
      recommendedModeLabelTr: recMeta.shortLabelTr,
      roomHarmonyNoteTr: `${roomProfile.roomShortTr} için 4500K doğal iç mekan ışığı ve doğrudan telefon flaşı; ${roomProfile.surfaceTr} üzerinde cilt gözeneklerini ve 3 satırlı kağıdı en gerçekçi tonda aydınlatır.`,
      autoLightingPromptEn: `[Environment-Matched Auto-Lighting (Mode: Natural 4500K Home & Flash)]: Calibrated 4500K natural domestic ambient light harmonized with ${roomProfile.surfaceEn}, paired with an unfiltered direct smartphone flash burst that preserves true-to-life skin undertones, visible pores, and shadow-free 3-line verification paper legibility`,
      autoLightingScenarioTr: `[Ortam Uyumlu Otomatik Aydınlatma (Işık Modu: Doğal 4500K): ${roomProfile.roomShortTr} (${roomProfile.surfaceTr}) ile uyumlu 4500K doğal ev aydınlatması ve patlamayan doğrudan telefon flaşı dengesi]`,
      shortLightingEn: `Auto-Lighting: Natural 4500K home light + direct phone flash harmonized with ${roomProfile.roomShortTr}`,
      lightingQualityScore: isRecommendedForRoom ? 98 : 94,
    };
  }

  if (modeId === 'sicak') {
    return {
      modeId: 'sicak',
      modeLabelTr: modeMeta.shortLabelTr,
      kelvinBadge: '2900K Sıcak Amber + Flaş',
      isRecommendedForRoom,
      recommendedModeId,
      recommendedModeLabelTr: recMeta.shortLabelTr,
      roomHarmonyNoteTr: `${roomProfile.roomShortTr} içerisinde 2900K sıcak gece lambası/aplik amber tonları ile telefon flaşını harmanlar; ${roomProfile.surfaceTr} üzerinde sıcak kontur (rim) ışığı ve doğal ten sıcaklığı oluşturur.`,
      autoLightingPromptEn: `[Environment-Matched Auto-Lighting (Mode: Warm 2900K Tungsten & Flash)]: Warm 2900K amber household lamp glow interacting naturally with ${roomProfile.surfaceEn}, balanced by a crisp frontal smartphone camera flash fill that keeps the 3-line white verification card neutral-white and skin texture warm without orange oversaturation`,
      autoLightingScenarioTr: `[Ortam Uyumlu Otomatik Aydınlatma (Işık Modu: Sıcak 2900K): ${roomProfile.roomShortTr} (${roomProfile.surfaceTr}) ile uyumlu 2900K sıcak gece lambası/amber tonu ve net telefon flaşı dolgusu]`,
      shortLightingEn: `Auto-Lighting: Warm 2900K tungsten room glow + balanced phone flash fill`,
      lightingQualityScore: isRecommendedForRoom ? 98 : 94,
    };
  }

  if (modeId === 'soguk') {
    return {
      modeId: 'soguk',
      modeLabelTr: modeMeta.shortLabelTr,
      kelvinBadge: '5600K Soğuk LED + Flaş',
      isRecommendedForRoom,
      recommendedModeId,
      recommendedModeLabelTr: recMeta.shortLabelTr,
      roomHarmonyNoteTr: `${roomProfile.roomShortTr} içerisinde 5600K kristal netliğinde soğuk beyaz LED ayna/tavan ışığı ve doğrudan telefon flaşı kullanır; ${roomProfile.surfaceTr} üzerinde el yazısı kontrastını ve gözenek mikro-detaylarını maksimuma çıkarır.`,
      autoLightingPromptEn: `[Environment-Matched Auto-Lighting (Mode: Cool 5600K Crisp LED & Flash)]: Clean 5600K cool-daylight indoor vanity LED illumination reflecting across ${roomProfile.surfaceEn}, combined with a high-shutter direct smartphone flash burst for ultra-crisp 3-line handwritten card contrast and high-definition unretouched skin pore clarity`,
      autoLightingScenarioTr: `[Ortam Uyumlu Otomatik Aydınlatma (Işık Modu: Soğuk 5600K): ${roomProfile.roomShortTr} (${roomProfile.surfaceTr}) ile uyumlu 5600K soğuk kristal LED ve yüksek netlikli telefon flaşı]`,
      shortLightingEn: `Auto-Lighting: Cool 5600K crisp indoor LED + high-contrast phone flash`,
      lightingQualityScore: isRecommendedForRoom ? 98 : 93,
    };
  }

  return {
    modeId: 'dramatik',
    modeLabelTr: modeMeta.shortLabelTr,
    kelvinBadge: '2600K Dramatik Low-Key + Flaş',
    isRecommendedForRoom,
    recommendedModeId,
    recommendedModeLabelTr: recMeta.shortLabelTr,
    roomHarmonyNoteTr: `${roomProfile.roomShortTr} içerisinde 2600K düşük anahtarlı (low-key chiaroscuro) derin arka plan gölgeleri ve doğrudan telefon flaşı kontrastı kurar; ${roomProfile.surfaceTr} önünde modeli ve 3 satırlı doğrulama kağıdını sinematik biçimde öne çıkarır.`,
    autoLightingPromptEn: `[Environment-Matched Auto-Lighting (Mode: Dramatic 2600K Low-Key Chiaroscuro & Flash)]: Moody 2600K low-key atmospheric room shadow falloff across ${roomProfile.surfaceEn}, punctured by a focused direct smartphone camera flash burst that creates authentic flash shadow outlines on the wall behind her while keeping her face and 3-line verification paper sharply lit`,
    autoLightingScenarioTr: `[Ortam Uyumlu Otomatik Aydınlatma (Işık Modu: Dramatik 2600K Kontrast): ${roomProfile.roomShortTr} (${roomProfile.surfaceTr}) ile uyumlu derin arka plan gölgeleri ve modeli öne çıkaran odaklı telefon flaşı kontrastı]`,
    shortLightingEn: `Auto-Lighting: Dramatic 2600K low-key shadows + focused direct smartphone flash burst`,
    lightingQualityScore: isRecommendedForRoom ? 98 : 95,
  };
}

export function applyLightingHarmonyToPromptEn(
  promptText: string,
  settingId: string,
  lightingMode: LightingModeId
): string {
  const harmony = getEnvironmentLightingHarmony(settingId, lightingMode);
  const cleaned = promptText.replace(
    /\s*\[Environment-Matched Auto-Lighting[^\]]*\]:[^-]*?(?=\s*\[(Runway|Kling|Luma|Motion Speed|Camera Path)|\s*--no\b|$)/gi,
    ''
  );
  const parts = cleaned.split(/\s+--no\s+/i);
  const body = (parts[0] || '').trim().replace(/\.$/, '');
  const neg = parts[1] ? ` --no ${parts[1].trim()}` : '';
  return `${body}. ${harmony.autoLightingPromptEn}.${neg}`;
}

export function applyLightingHarmonyToScenarioTr(
  scenarioTr: string,
  settingId: string,
  lightingMode: LightingModeId
): string {
  const harmony = getEnvironmentLightingHarmony(settingId, lightingMode);
  const cleaned = scenarioTr.replace(
    /\s*\[Ortam Uyumlu Otomatik Aydınlatma[^\]]*\]\.?/g,
    ''
  );
  return `${cleaned.trim().replace(/\.$/, '')}. ${harmony.autoLightingScenarioTr}.`;
}

export const NEGATIVE_PRESET_TAGS: { id: string; labelTr: string; termsEn: string }[] = [
  {
    id: 'skin-realism',
    labelTr: 'Doğal Cilt & Yüz Koruma (Anti-Plastik / Uncanny)',
    termsEn:
      'uncanny valley, plastic skin, distorted jawline, over-tanned, exaggerated features, shifting face, plastic airbrushed skin, wax figure, excessive contouring',
  },
  {
    id: 'hand-anatomy',
    labelTr: 'El & Parmak Anatomisi Koruma',
    termsEn: 'deformed hands, extra fingers, missing fingers, fused digits, mutated hands holding paper, six fingers',
  },
  {
    id: 'paper-text',
    labelTr: 'Kağıt & Yazı Netliği Koruma',
    termsEn: 'blurry or garbled text on card, unreadable letters, blank paper, warped paper edges, floating paper',
  },
  {
    id: 'style-guard',
    labelTr: 'Çizgi/3D/Yapay Stil Engelleme',
    termsEn: 'cartoon, 3D render, CGI, anime, illustration, oversaturated neon lighting, watermark, UI overlay',
  },
  {
    id: 'motion-guard',
    labelTr: 'Yüz Kayması & Hareket Bozulması Engelleme',
    termsEn: 'shifting face, facial morphing during movement, distorted jawline, camera shake, sudden morphing, flickering lighting, extra limbs, bad anatomy',
  },
];

export const RAW_PHONE_CAMERA_DIRECTIVE_TR =
  'Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf.';

export const RAW_PHONE_CAMERA_DIRECTIVE_EN =
  'shot on a smartphone camera, slightly soft motion-blur and low-light indoor atmosphere, harsh direct camera flash burst, unfiltered, raw candid photo';

export const NATURAL_HOME_TEXTURE_DIRECTIVE_TR =
  'Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamı.';

export const NATURAL_HOME_TEXTURE_DIRECTIVE_EN =
  'non-porcelain unretouched skin with slight natural skin imperfections, visible fine pores and authentic natural human skin texture, everyday casual home environment';

export const SOFT_NATURAL_SKIN_DIRECTIVE_EN =
  'non-porcelain unretouched skin with slight natural skin imperfections, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no porcelain doll look, no uncanny valley face), visible fine skin pores';

export const DEFAULT_NEGATIVE_PROMPT =
  'deformed face, ugly, distorted facial features, plastic airbrushed skin, bad anatomy, asymmetric eyes, blurry, extra fingers, mutated hands, cartoon, 3D render, anime, oversaturated neon lighting, watermark, UI overlay, uncanny valley, plastic skin, porcelain doll skin, distorted jawline, over-tanned, exaggerated features, shifting face';

export const HAIR_OPTIONS: BilingualStudioOption[] = [
  {
    id: 'platinum-waves-roots',
    labelTr: 'Platin Sarışın · Uzun Hacimli Dalgalar',
    detailTr: 'Omuzlara dökülen parlak platin sarısı dalgalı saçlar, yumuşak doğal cilt dokusu ve hafif makyaj',
    promptEn:
      'an attractive, modern 24-year-old female model with long, voluminous platinum-blonde wavy hair cascading past her shoulders, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no uncanny valley face), visible fine pores, and captivating eyes',
    promptTr:
      'omuzlarından aşağı dökülen uzun ve hacimli platin sarısı dalgalı saçlara, plastik parlaması olmayan yumuşak ve doğal gözenekli cilt dokusuna, hafif doğal makyaja ve gerçekçi yüz hatlarına sahip 24 yaşında modern kadın model',
    shortSpec: 'Platinum Blonde Waves',
  },
  {
    id: 'honey-blonde-sleek',
    labelTr: 'Bal Köpüğü Sarışın · İpeksi Düz Fön',
    detailTr: 'Ortadan ayrılmış cam parlaklığında düz bal sarısı saçlar, sıcak cilt alt tonu',
    promptEn:
      'a stunning, contemporary 25-year-old female model with sleek, glass-shine honey-blonde straight hair parted cleanly in the center, sun-kissed radiant complexion, almond-shaped eyes, and poised model proportions',
    promptTr:
      'ortadan kusursuzca ayrılmış cam parlaklığında düz bal köpüğü sarısı saçlara, sıcak ve ışıltılı cilt tonuna, badem gözlere ve zarif model fiziğine sahip 25 yaşında modern kadın model',
    shortSpec: 'Honey Blonde Sleek',
  },
  {
    id: 'golden-space-buns',
    labelTr: 'Altın Sarışın · Çift Üst Topuz (Space Buns) & Perçem',
    detailTr: 'Yüzü çerçeveleyen ince sarı tutamlarla modern çift üst topuz stili',
    promptEn:
      'a glamorous, youthful 23-year-old blonde female model styled with trendy double high space-buns and soft face-framing golden-blonde tendrils, flawless natural studio makeup, subtle choker necklace, and a charming smile',
    promptTr:
      'yüzünü çerçeveleyen yumuşak altın sarısı perçemler ve modern çift üst topuz (space buns) saç stiline, kusursuz doğal makyaja ve zarif boyun aksesuarına sahip 23 yaşında çekici sarışın kadın model',
    shortSpec: 'Golden Space-Buns',
  },
  {
    id: 'espresso-brunette-waves',
    labelTr: 'Koyu Kestane / Esmer · İpeksi Hollywood Dalgaları',
    detailTr: 'Yoğun parlak koyu kestane saçlar, belirgin yüz hatları ve buğulu göz makyajı',
    promptEn:
      'an alluring, modern 25-year-old brunette female model with rich espresso-brown glossy Hollywood waves flowing over her shoulders, warm olive-toned natural skin, smoky eye makeup, and magnetic confidence',
    promptTr:
      'omuzlarına dökülen parlak koyu kestane Hollywood dalgalı saçlara, sıcak doğal cilt tonuna, buğulu göz makyajına ve yüksek özgüvene sahip 25 yaşında çekici esmer kadın model',
    shortSpec: 'Espresso Brunette Waves',
  },
  {
    id: 'copper-auburn-curls',
    labelTr: 'Bakır Kızıl · Doğal Işıltılı Katlı Kesim',
    detailTr: 'Sinematik ışıkta parlayan sıcak bakır-kızıl katlı saçlar ve pürüzsüz cilt',
    promptEn:
      'a striking, modern 24-year-old female model with vibrant copper-auburn layered waves, porcelain-smooth natural skin texture, soft glossy lips, and an expressive, confident gaze',
    promptTr:
      'sinematik ışıkta parlayan canlı bakır-kızıl katlı dalgalı saçlara, pürüzsüz doğal cilt dokusuna ve özgüvenli bakışlara sahip 24 yaşında modern kadın model',
    shortSpec: 'Copper Auburn Layers',
  },
  {
    id: 'champagne-messy-updo',
    labelTr: 'Şampanya Sarışın · Zarif Dağınık Topuz',
    detailTr: 'Boyun ve omuz zarafetini öne çıkaran şampanya sarısı gevşek topuz',
    promptEn:
      'a sophisticated 26-year-old champagne-blonde female model with an effortless high updo and loose wispy strands framing her jawline, refined high-fashion makeup, and graceful posture',
    promptTr:
      'çene hattını çerçeveleyen ince tutamlarla tamamlanmış zarif bir şampanya sarısı dağınık topuza, yüksek moda makyajına ve asil bir duruşa sahip 26 yaşında kadın model',
    shortSpec: 'Champagne Blonde Updo',
  },
];

export const WARDROBE_OPTIONS: BilingualStudioOption[] = [
  {
    id: 'crimson-black-corset-heels',
    labelTr: 'Bordo & Siyah Çapraz Bantlı Dantel Korse Takım + Kafes Bantlı Stiletto',
    detailTr: 'Çapraz göğüs bantlı bordo-siyah dantel büstiyer, fırfırlı kemer detayı ve yüksek platformlu kafes bantlı topuklu',
    promptEn:
      'wearing a chic deep-crimson and black strappy cross-front French lace corset two-piece ensemble with a ruffled lace waist belt and towering black caged ankle-strap platform stiletto high heels',
    promptTr:
      'çapraz bant detaylı bordo ve siyah Fransız danteli iki parçalı şık korse takım, fırfırlı dantel kemer detayı ve yüksek platformlu siyah kafes bantlı stiletto topuklu ayakkabılar',
    shortSpec: 'Crimson Lace Corset + Caged Heels',
  },
  {
    id: 'emerald-halter-lace-cuff',
    labelTr: 'Zümrüt Yeşili & Siyah Halter Yaka Dantel Kombin + Bilek Bantlı Stiletto',
    detailTr: 'Boyundan bağlı damla (keyhole) kesimli dantel üst, uyumlu tasarım alt ve kalın bilek bantlı açık burun stiletto',
    promptEn:
      'dressed in an alluring emerald-green and black floral lace halter-neck keyhole bralette and matching strappy designer loungewear set, paired with sleek black wide ankle-cuff open-toe stiletto high heels',
    promptTr:
      'boyundan bağlı damla (keyhole) dekolteli zümrüt yeşili ve siyah çiçekli dantel büstiyer, uyumlu tasarım alt parça ve kalın bilek bantlı siyah açık burunlu stiletto topuklu ayakkabılar',
    shortSpec: 'Emerald Keyhole Lace + Cuff Heels',
  },
  {
    id: 'pearl-champagne-satin-robe',
    labelTr: 'İnci Beyazı Saten Korse Takım & İpek Sabahlık + Gümüş Stiletto',
    detailTr: 'Balenli şampanya-beyaz saten korse, omuzlardan süzülen transparan ipek sabahlık ve metalik gümüş stiletto',
    promptEn:
      'wearing a luxurious pearl-white and champagne silk satin structured corset ensemble with an open sheer silk robe draped lightly off her shoulders, finished with glossy metallic-silver pointed stiletto high heels',
    promptTr:
      'inci beyazı ve şampanya tonlarında balenli ipek saten korse takım, omuzlarından zarifçe süzülen yarı transparan ipek sabahlık ve parlak metalik gümüş sivri burunlu yüksek topuklu ayakkabılar',
    shortSpec: 'Pearl Satin Corset + Silver Heels',
  },
  {
    id: 'obsidian-silk-slip-louboutin',
    labelTr: 'Gece Siyahı İpek Saten & Fransız Dantel Takım + Siyah Rugan Stiletto',
    detailTr: 'Siyah saten ve dantel işlemeli lüks takım, bacak boyunu uzatan parlak siyah rugan stiletto',
    promptEn:
      'styled in a sleek obsidian-black silk satin and Chantilly lace trim two-piece evening loungewear ensemble, paired with glossy black patent-leather pointed stiletto high heels',
    promptTr:
      'gece siyahı ipek saten ve Fransız danteli işlemeli lüks iki parçalı gece kombini ve parlak siyah rugan sivri burunlu yüksek topuklu stiletto ayakkabılar',
    shortSpec: 'Black Silk & Lace + Patent Heels',
  },
  {
    id: 'ruby-velvet-bustier-gold',
    labelTr: 'Yakut Kırmızısı Kadife Büstiyer Kombin + Altın Bantlı Topuklu',
    detailTr: 'Zengin yakut kırmızısı kadife ve tül detaylı büstiyer takım, ince altın bantlı yüksek topuklu sandalet',
    promptEn:
      'wearing an opulent ruby-red velvet and sheer mesh structured bustier ensemble with delicate gold hardware accents, matched with minimalist metallic-gold strappy stiletto high heels',
    promptTr:
      'altın aksesuar detaylı yakut kırmızısı kadife ve tül büstiyer kombinasyonu ile ince metalik altın bantlı yüksek topuklu stiletto ayakkabılar',
    shortSpec: 'Ruby Velvet Bustier + Gold Heels',
  },
];

export const SETTING_OPTIONS: BilingualStudioOption[] = [
  {
    id: 'casual-everyday-home',
    labelTr: 'Günlük Ev Ortamı: Doğal Yatak Odası, Boy Aynası & Loş Ev Işığı',
    detailTr: 'Porselen gibi pürüzsüz olmayan doğal dokuyla uyumlu, samimi ve gerçekçi günlük ev odası ortamı',
    promptEn:
      'inside an authentic everyday casual home environment with a lived-in bedroom corner, an unmade cozy bed with neutral cotton sheets, a simple full-length room mirror, warm dim household lamp light, and natural domestic walls',
    promptTr:
      'samimi ve gerçekçi bir günlük ev ortamı (doğal yatak odası köşesi, boy aynası ve hafif düşük ışıklı ev aydınlatması)',
    shortSpec: 'Everyday Casual Home Room',
  },
  {
    id: 'modern-wood-doorway',
    labelTr: 'Ev Girişi / Kapı Önü: Ahşap Oda Kapısı & Ev Koridoru',
    detailTr: 'Günlük ev ortamında ahşap kapı önü, boy aynası ve düşük ışıklı doğal ev antresi',
    promptEn:
      'inside an everyday casual home apartment hallway right in front of a warm wooden room door with a full-length hallway mirror and dim low-light indoor home ambiance',
    promptTr:
      'günlük ev ortamında ahşap oda kapısı önü, boy aynası ve düşük ışıklı doğal ev koridoru',
    shortSpec: 'Everyday Home Doorway & Hall',
  },
  {
    id: 'luxury-hotel-suite-drapes',
    labelTr: 'Loş Yatak Odası: Koyu Perdeler, Yatak Kenarı & Gece Lambası',
    detailTr: 'Koyu perdeler, yatak kenarı ve düşük ışıklı gece atmosferi',
    promptEn:
      'inside a dimly lit private bedroom suite with dark curtains, a cozy bed with rumpled white linens, a lounge chair, and a tall mirror in a casual lived-in home atmosphere',
    promptTr:
      'koyu perdeler, doğal yatak kenarı ve düşük ışıklı samimi yatak odası ortamı',
    shortSpec: 'Dim Bedroom & Drapes',
  },
  {
    id: 'dressing-room-vanity-mirror',
    labelTr: 'Ayna Karşısı: Ev Giyinme Köşesi & Boy Aynası Önü',
    detailTr: 'Ev içi boy aynası karşısı, makyaj masası ve doğal parke zemin',
    promptEn:
      'inside a casual home dressing room corner in front of a full-length mirror, a small vanity table, and warm wooden parquet flooring in an everyday home environment',
    promptTr:
      'günlük ev ortamında boy aynası karşısı, makyaj köşesi ve ahşap parke zemin',
    shortSpec: 'Home Mirror & Dressing Corner',
  },
  {
    id: 'italian-marble-bathroom',
    labelTr: 'Ev Banyosu: Ayna Önü & Loş Banyo Işığı',
    detailTr: 'Telefon flaşı yansımasına uygun ev banyosu aynası önü',
    promptEn:
      'inside a realistic home bathroom in front of a vanity mirror with warm dim wall light and natural tile surfaces',
    promptTr:
      'günlük ev banyosu ayna önü ve doğal düşük ışıklı iç mekan',
    shortSpec: 'Home Bathroom Mirror',
  },
];

export const FPS_OPTIONS: {
  value: VideoFpsOption;
  labelTr: string;
  badgeTr: string;
  frameTimeMs: string;
  estBitrateMbps: string;
  estFileSizeMb: string;
  promptEn: string;
  promptTr: string;
  shortSpec: string;
}[] = [
  {
    value: 24,
    labelTr: '24 FPS',
    badgeTr: 'Sinematik Film',
    frameTimeMs: '41.7 ms',
    estBitrateMbps: '6.8 Mbps',
    estFileSizeMb: '~6.4 MB',
    promptEn: '24fps cinematic frame rate with natural 180-degree shutter motion cadence',
    promptTr: '24 FPS sinematik kare hızı (doğal film akışı)',
    shortSpec: '24fps cinematic cadence',
  },
  {
    value: 30,
    labelTr: '30 FPS',
    badgeTr: 'Standart Reels / TikTok',
    frameTimeMs: '33.3 ms',
    estBitrateMbps: '8.4 Mbps',
    estFileSizeMb: '~7.9 MB',
    promptEn: '30fps native smartphone social media reel frame rate with crisp mobile temporal cadence',
    promptTr: '30 FPS doğal telefon kamerası ve TikTok/Reels standart kare hızı',
    shortSpec: '30fps native mobile reel cadence',
  },
  {
    value: 60,
    labelTr: '60 FPS',
    badgeTr: 'Ultra Akıcı (High-FPS)',
    frameTimeMs: '16.7 ms',
    estBitrateMbps: '13.2 Mbps',
    estFileSizeMb: '~12.4 MB',
    promptEn: '60fps ultra-smooth high frame rate with hyper-fluid lifelike temporal motion physics',
    promptTr: '60 FPS ultra akıcı yüksek kare hızı (pürüzsüz ve canlı hareket fiziği)',
    shortSpec: '60fps ultra-smooth high frame rate',
  },
];

export function getFpsDescriptor(fps: VideoFpsOption = 24) {
  return FPS_OPTIONS.find((item) => item.value === fps) || FPS_OPTIONS[0];
}

export function applyFpsToPromptEn(promptText: string, fps: VideoFpsOption): string {
  const fpsInfo = getFpsDescriptor(fps);
  const replaced = promptText
    .replace(
      /\b(24|30|60)fps (cinematic frame rate with natural 180-degree shutter motion cadence|native smartphone social media reel frame rate with crisp mobile temporal cadence|ultra-smooth high frame rate with hyper-fluid lifelike temporal motion physics|cinematic cadence|native mobile reel cadence|ultra-smooth high frame rate)\b/gi,
      fpsInfo.promptEn
    )
    .replace(/\b(24|30|60)\s*fps\b/gi, `${fps}fps`);

  if (!new RegExp(`\\b${fps}\\s*fps\\b`, 'i').test(replaced)) {
    const parts = replaced.split(/\s+--no\s+/i);
    const main = (parts[0] || '').trim();
    const neg = parts[1] ? ` --no ${parts[1].trim()}` : '';
    return `${main} Frame rate: ${fpsInfo.promptEn}.${neg}`;
  }
  return replaced;
}

export function applyFpsToScenarioTr(scenarioTr: string, fps: VideoFpsOption): string {
  const fpsInfo = getFpsDescriptor(fps);
  const replaced = scenarioTr
    .replace(
      /24 FPS sinematik kare hızı \(doğal film akışı\)|30 FPS doğal telefon kamerası ve TikTok\/Reels standart kare hızı|60 FPS ultra akıcı yüksek kare hızı \(pürüzsüz ve canlı hareket fiziği\)/g,
      fpsInfo.promptTr
    )
    .replace(/\b(24|30|60)\s*FPS\b/g, `${fps} FPS`);

  if (!replaced.includes(`${fps} FPS`)) {
    return `${replaced} [Kare Hızı: ${fpsInfo.promptTr}]`;
  }
  return replaced;
}

export const VIDEO_SPEED_OPTIONS: {
  value: VideoSpeedOption;
  labelTr: string;
  shortLabel: string;
  badgeTr: string;
  directiveEn: string;
  directiveTr: string;
  shortCompressedEn: string;
}[] = [
  {
    value: 0.5,
    labelTr: '0.5x (Yavaş)',
    shortLabel: '0.5x',
    badgeTr: 'Sinematik Yavaş Çekim',
    directiveEn:
      '[Motion Speed Directive: 0.5x Slow-Motion]: Rendered at 0.5x half-speed cinematic slow-motion cadence with ultra-fluid micro-movements, graceful unhurried hair and fabric flow, and zero motion blur',
    directiveTr:
      '[Video Hızı Direktifi (0.5x Yavaş Çekim): Akıcı yarım hız (0.5x slow-motion) sinematik hareket temposu, yumuşak saç ve kumaş salınımı]',
    shortCompressedEn: 'Motion Speed: 0.5x slow-motion cadence',
  },
  {
    value: 1,
    labelTr: '1x (Normal)',
    shortLabel: '1x',
    badgeTr: 'Gerçek Zamanlı Doğal Hız',
    directiveEn:
      '[Motion Speed Directive: 1x Real-Time]: Rendered at 1x natural real-time human motion speed with authentic organic pacing, natural eye-blink timing, and lifelike candid physics',
    directiveTr:
      '[Video Hızı Direktifi (1x Normal Hız): Doğal 1x gerçek zamanlı insan hareket hızı ve organik ritim]',
    shortCompressedEn: 'Motion Speed: 1x natural real-time pace',
  },
  {
    value: 2,
    labelTr: '2x (Hızlı)',
    shortLabel: '2x',
    badgeTr: 'Dinamik Hızlı Reels Akışı',
    directiveEn:
      '[Motion Speed Directive: 2x Fast-Paced]: Rendered at 2x accelerated fast-paced social media reel tempo with brisk, energetic transitions while keeping facial geometry and the 3-line verification card 100% locked and legible',
    directiveTr:
      '[Video Hızı Direktifi (2x Hızlı Akış): Enerjik 2x hızlandırılmış Reels/TikTok temposu, yüz simetrisi ve 3 satırlı kağıt netliği %100 sabit]',
    shortCompressedEn: 'Motion Speed: 2x fast-paced reel tempo',
  },
];

export function getVideoSpeedDescriptor(speed: VideoSpeedOption = 1) {
  return VIDEO_SPEED_OPTIONS.find((item) => item.value === speed) || VIDEO_SPEED_OPTIONS[1];
}

export function applyVideoSpeedToPromptEn(
  promptText: string,
  speed: VideoSpeedOption
): string {
  const speedInfo = getVideoSpeedDescriptor(speed);
  const cleaned = promptText
    .replace(
      /\s*\[Motion Speed Directive:[^\]]*\]:[^-]*?(?=\s*--no\b|$)/gi,
      ''
    )
    .replace(
      /\bMotion Speed:\s*(0\.5x slow-motion cadence|1x natural real-time pace|2x fast-paced reel tempo)\.?\s*/gi,
      ''
    );

  const parts = cleaned.split(/\s+--no\s+/i);
  const body = (parts[0] || '').trim().replace(/\.$/, '');
  const neg = parts[1] ? ` --no ${parts[1].trim()}` : '';
  return `${body}. ${speedInfo.directiveEn}.${neg}`;
}

export function applyVideoSpeedToScenarioTr(
  scenarioTr: string,
  speed: VideoSpeedOption
): string {
  const speedInfo = getVideoSpeedDescriptor(speed);
  const cleaned = scenarioTr.replace(
    /\s*\[Video Hızı Direktifi[^\]]*\]\.?/g,
    ''
  );
  return `${cleaned.trim().replace(/\.$/, '')}. ${speedInfo.directiveTr}.`;
}

export function getModelDifferentiationSpec(
  platform: VideoModelPlatform,
  options?: {
    turnAngle?: 'soft' | '180' | '360';
    fps?: VideoFpsOption;
    videoSpeed?: VideoSpeedOption;
    motionIntensity?: number;
  }
): ModelDifferentiationSpec {
  const turnAngle = options?.turnAngle || 'soft';
  const fps = options?.fps || 24;
  const videoSpeed = options?.videoSpeed || 1;
  const motionVal = options?.motionIntensity ?? 3;
  const normalizedMotion = (motionVal / 10).toFixed(2);
  const zoomVec = turnAngle === 'soft' ? '+0.10' : '+0.15';
  const panVec = turnAngle === '180' ? '+0.15 (lateral track)' : turnAngle === '360' ? '+0.15 (orbital gimbal arc)' : '0.00 (locked)';

  if (platform === 'runway') {
    return {
      id: 'runway',
      nameTr: 'Runway Gen-3 Alpha',
      badgeTr: 'Camera Control & Motion Brush',
      architectureTr: '[Bracket] Sahne Katmanlama + Kamera Vektör Kontrolü',
      descriptionTr:
        'Runway Gen-3 Alpha için sahneyi [Camera], [Subject], [Environment], [Action] bloklarına ayırır; Camera Control vektörlerini (Horizontal/Vertical/Zoom/Roll) ve Motion Brush bölge kilitlerini teknik parametre olarak işler.',
      jargonTerms: [
        {
          term: 'camera_control',
          value: `pan: ${panVec}, tilt: 0.0, zoom: ${zoomVec}, roll: 0.0`,
          explanationTr: 'Runway kamera kontrol vektörleri ile perspektif kaymasını önler.',
        },
        {
          term: 'motion_brush_scale',
          value: `ambient: ${motionVal}/10 (${normalizedMotion}), face_lock: 0.96`,
          explanationTr: 'Saç ve kumaşa mikro hareket verirken yüz bölgesini sabitler.',
        },
        {
          term: 'temporal_coherence',
          value: `weight: 0.95 · ${fps}fps · ${videoSpeed}x`,
          explanationTr: 'Kareler arası doku, gözenek ve 3 satırlı kağıt tutarlılığını korur.',
        },
        {
          term: 'optical_profile',
          value: '26mm f/1.8 Smartphone Direct Flash Falloff',
          explanationTr: 'Ham telefon flaşı ışık düşümünü ve Fujifilm 400 grenini simüle eder.',
        },
      ],
      technicalBlockEn: `[Runway Gen-3 Alpha Technical Parameters]: camera_control={pan: "${panVec}", tilt: 0.0, zoom: "${zoomVec}", roll: 0.0}, motion_brush={subject_body_scale: ${normalizedMotion} (${motionVal}/10), facial_identity_lock: 0.96, card_text_region: "static_pinned"}, temporal_coherence_weight=0.95, optical_emulation="26mm f/1.8 smartphone lens with harsh direct flash falloff & Fujifilm 400 grain"`,
      shortTechnicalEn: `Runway Gen-3: camera_control(zoom:${zoomVec}, pan:${panVec}), motion_brush(${normalizedMotion}), temporal_coherence:0.95`,
    };
  }

  if (platform === 'kling') {
    return {
      id: 'kling',
      nameTr: 'Kling AI 1.6 Pro',
      badgeTr: 'Motion Intensity & CFG Scale',
      architectureTr: 'Motion Intensity + 3D Yüz/El İskelet Kilidi + 0s–5s Akış',
      descriptionTr:
        'Kling AI 1.6 Pro motorunun yerel "motion_intensity" (hareket yoğunluğu), "cfg_scale" (prompt sadakati) ve 3D el/parmak iskelet rijitliği parametrelerini kullanarak yüz deformasyonunu sıfırlar.',
      jargonTerms: [
        {
          term: 'motion_intensity',
          value: `${normalizedMotion} (Motion Intensity ${motionVal}/10 — Low-Deformation)`,
          explanationTr: 'Kling hareket ölçeğini optimize ederek yüz ve çene hattı bozulmasını engeller.',
        },
        {
          term: 'cfg_scale',
          value: '0.65 (Prompt Sadakati & Doğal Cilt Dengesi)',
          explanationTr: 'Aşırı kontrast/plastik görünümü önleyen ideal Kling rehberlik katsayısı.',
        },
        {
          term: 'kling_3d_skeleton_lock',
          value: '5-Finger Hand Rigidity & 3-Line Card Pinning',
          explanationTr: 'Doğrulama kağıdını tutan parmak anatomisini ve 3 satır yazıyı kilitler.',
        },
        {
          term: 'camera_control',
          value: `gimbal_lock (zoom: ${zoomVec}, speed: ${videoSpeed}x, ${fps}fps)`,
          explanationTr: 'Kling kamera sabitleyici modülü ile sarsıntısız dikey 9:16 akış sağlar.',
        },
      ],
      technicalBlockEn: `[Kling AI 1.6 Pro Technical Parameters]: motion_intensity=${normalizedMotion} (Motion Intensity ${motionVal}/10 — low-deformation anatomical preservation mode), cfg_scale=0.65 (optimal prompt fidelity without plastic skin oversaturation), camera_control={mode: "gimbal_lock", zoom: "${zoomVec}", pan: "${panVec}"}, kling_3d_skeleton_constraint="strict 5-finger hand anatomy & pinned 3-line verification card legibility"`,
      shortTechnicalEn: `Kling 1.6 Pro: motion_intensity:${normalizedMotion} (${motionVal}/10), cfg_scale:0.65, 3D_hand_face_lock:enabled`,
    };
  }

  return {
    id: 'luma',
    nameTr: 'Luma Dream Machine (Ray2)',
    badgeTr: 'Keyframe 0→1 & Ray2 Physics',
    architectureTr: 'Start/End Keyframe Köprüsü + Ray2 Fiziksel Işık & Kumaş Motoru',
    descriptionTr:
      'Luma Ray2 mimarisi için "Keyframe 0 (Başlangıç Referansı)" ile "Keyframe 1 (Hedef Bitiş)" arasında sıfır-morfing (zero-morphing) optik akış köprüsü ve fiziksel telefon flaşı yansıma simülasyonu kurar.',
    jargonTerms: [
      {
        term: 'keyframe_0_weight',
        value: '0.98 (Start Frame Anchor Identity Lock)',
        explanationTr: 'Başlangıç karesindeki yüz hatlarını ve 3 satırlı kağıdı %98 ağırlıkla korur.',
      },
      {
        term: 'keyframe_1_bridge',
        value: `Zero-Morphing Optical Flow (${fps}fps · ${videoSpeed}x)`,
        explanationTr: 'Başlangıç ve bitiş pozu arasında yüz kayması olmadan pürüzsüz geçiş üretir.',
      },
      {
        term: 'ray2_motion_physics',
        value: `velocity_scale: ${normalizedMotion} (${motionVal}/10) · Cloth & Hair Inertia`,
        explanationTr: 'Luma Ray2 fizik motoruyla topuklu dönüşünde doğal kumaş ve saç salınımı sağlar.',
      },
      {
        term: 'ray2_light_transport',
        value: 'Direct Flash Specular Bounce & Subsurface Skin Pores',
        explanationTr: 'Telefon flaşının cilt gözenekleri ve ev ortamındaki gerçekçi ışık kırılımını hesaplar.',
      },
    ],
    technicalBlockEn: `[Luma Dream Machine Ray2 Technical Parameters]: keyframe_0_weight=0.98 (Start Frame Identity & 3-Line Card Anchor), keyframe_1_weight=0.95 (End Frame Natural Smile Lock), ray2_motion_physics={velocity_scale: ${normalizedMotion} (${motionVal}/10), natural_cloth_and_hair_inertia: true, zero_morphing_interpolation: true}, ray2_light_transport="direct smartphone flash specular bounce & subsurface non-porcelain skin scattering", loop=false`,
    shortTechnicalEn: `Luma Ray2: keyframe_0_weight:0.98, ray2_physics(velocity:${normalizedMotion}), zero_morphing_flow`,
  };
}

export function enrichPromptWithModelJargon(
  promptText: string,
  platform: VideoModelPlatform,
  options?: {
    turnAngle?: 'soft' | '180' | '360';
    fps?: VideoFpsOption;
    videoSpeed?: VideoSpeedOption;
    motionIntensity?: number;
  }
): string {
  const spec = getModelDifferentiationSpec(platform, options);
  const cleaned = promptText.replace(
    /\s*\[(Runway Gen-3 Alpha|Kling AI 1\.6 Pro|Luma Dream Machine Ray2) Technical Parameters\]:[^-]*?(?=\s*--no\b|$)/gi,
    ''
  );
  const parts = cleaned.split(/\s+--no\s+/i);
  const body = (parts[0] || '').trim().replace(/\.$/, '');
  const neg = parts[1] ? ` --no ${parts[1].trim()}` : '';
  return `${body}. ${spec.technicalBlockEn}.${neg}`;
}

export const ADVANCED_PROMPT_FILTER_OPTIONS: {
  id: AdvancedPromptFilterId;
  labelTr: string;
  badgeTr: string;
  shortDescTr: string;
}[] = [
  {
    id: 'fotogercekci',
    labelTr: 'Fotogerçekçi (Raw Candid)',
    badgeTr: 'Makro Cilt & Ham Telefon Flaşı',
    shortDescTr:
      'Filtresiz telefon kamerası gerçekçiliği, görünür gözenekler ve sıfır yapay pürüzsüzleştirme.',
  },
  {
    id: 'cinematic',
    labelTr: 'Cinematic (35mm Film Tonu)',
    badgeTr: 'Anamorfik Alan Derinliği & Kontrast',
    shortDescTr:
      '35mm sinema filmi tonlaması, zengin chiaroscuro gölge geçişi ve yumuşak ışık halesi (halation).',
  },
  {
    id: 'sanatsal',
    labelTr: 'Sanatsal (Analog Editoryal)',
    badgeTr: 'Gümüş-Halojen & Editoryal Kompozisyon',
    shortDescTr:
      'Bağımsız sanat galerisi estetiği, dokunsal Fujifilm 400 emülsiyon greni ve şiirsel ışık dengesi.',
  },
];

export const KEYWORD_WEIGHT_BOOST_OPTIONS: {
  id: KeywordWeightBoost;
  labelTr: string;
  multiplierText: string;
  delta: number;
}[] = [
  {
    id: 'standart',
    labelTr: 'Dengeli Ağırlık',
    multiplierText: ':1.20–1.25',
    delta: 0,
  },
  {
    id: 'guclu',
    labelTr: 'Güçlü Vurgu',
    multiplierText: ':1.30–1.35',
    delta: 0.1,
  },
  {
    id: 'maksimum',
    labelTr: 'Maksimum Ağırlık',
    multiplierText: ':1.40–1.45',
    delta: 0.2,
  },
];

export function getAdvancedPromptFilterSpec(
  filterId: AdvancedPromptFilterId = 'fotogercekci',
  weightBoost: KeywordWeightBoost = 'guclu'
): AdvancedPromptFilterSpec {
  const boostObj =
    KEYWORD_WEIGHT_BOOST_OPTIONS.find((b) => b.id === weightBoost) ||
    KEYWORD_WEIGHT_BOOST_OPTIONS[1];
  const d = boostObj.delta;

  if (filterId === 'cinematic') {
    const rawTokens: { tokenEn: string; labelTr: string; baseWeight: number }[] = [
      {
        tokenEn: 'cinematic 35mm shallow depth of field & highlight halation',
        labelTr: '35mm Sinematik Alan Derinliği & Işık Halesi',
        baseWeight: 1.25,
      },
      {
        tokenEn: 'moody chiaroscuro shadow roll-off & filmic color grading',
        labelTr: 'Chiaroscuro Gölge Geçişi & Film Renk Tonu',
        baseWeight: 1.22,
      },
      {
        tokenEn: 'organic Fujifilm 400 cinema stock grain structure',
        labelTr: 'Organik Fujifilm 400 Sinema Greni',
        baseWeight: 1.18,
      },
      {
        tokenEn: 'unretouched natural skin pores in cinematic key light',
        labelTr: 'Sinematik Ana Işıkta Doğal Cilt Gözenekleri',
        baseWeight: 1.2,
      },
    ];
    const weightedTokens: WeightedKeywordToken[] = rawTokens.map((t) => {
      const w = (t.baseWeight + d).toFixed(2);
      return {
        ...t,
        effectiveWeight: `(${t.tokenEn}:${w})`,
      };
    });
    const weightsString = weightedTokens.map((w) => w.effectiveWeight).join(', ');

    return {
      id: 'cinematic',
      labelTr: 'Cinematic (35mm Sinematik Ton)',
      badgeTr: `Cinematic · ${boostObj.multiplierText}`,
      toneTitleTr: '35mm Auteur Sinema Tonu & Chiaroscuro Kontrast Ağırlığı',
      toneDescriptionTr:
        'Promptun genel tonunu 35mm sinema filmi atmosferine çevirir; ışık halesi (halation), zengin gölge derinliği ve Fujifilm 400 sinema greni anahtar kelimelerinin ağırlığını artırırken doğal cilt dokusunu korur.',
      weightBoost,
      weightBoostLabelTr: boostObj.labelTr,
      weightedTokens,
      filterDirectiveEn: `[Advanced Style Filter: Cinematic 35mm Film Tone · Keyword Weights: ${weightsString} — dramatic auteur cinema tone, subtle highlight halation, rich shadow depth while preserving raw smartphone flash candidness and non-porcelain natural skin]`,
      shortFilterEn: `[Style: Cinematic 35mm · ${weightedTokens[0].effectiveWeight}, ${weightedTokens[1].effectiveWeight}]`,
      filterDirectiveTr: `[İleri Düzey Stil Filtresi: Cinematic (35mm Sinematik Film Tonu · ${boostObj.labelTr} ${boostObj.multiplierText}) — Sinematik alan derinliği, dramatik gölge geçişi ve organik Fujifilm 400 sinema greni ağırlıklandırıldı]`,
    };
  }

  if (filterId === 'sanatsal') {
    const rawTokens: { tokenEn: string; labelTr: string; baseWeight: number }[] = [
      {
        tokenEn: 'editorial analog art-house photography composition',
        labelTr: 'Editoryal Analog Sanat Kompozisyonu',
        baseWeight: 1.25,
      },
      {
        tokenEn: 'tactile silver-halide Fujifilm 400 emulsion grain',
        labelTr: 'Dokunsal Gümüş-Halojen Film Emülsiyonu',
        baseWeight: 1.22,
      },
      {
        tokenEn: 'poetic ambient light interplay & expressive shadow geometry',
        labelTr: 'Şiirsel Işık Kırılımı & Gölge Geometrisi',
        baseWeight: 1.2,
      },
      {
        tokenEn: 'authentic unretouched human skin & organic posture',
        labelTr: 'İşlenmemiş Gerçekçi Ten & Organik Duruş',
        baseWeight: 1.18,
      },
    ];
    const weightedTokens: WeightedKeywordToken[] = rawTokens.map((t) => {
      const w = (t.baseWeight + d).toFixed(2);
      return {
        ...t,
        effectiveWeight: `(${t.tokenEn}:${w})`,
      };
    });
    const weightsString = weightedTokens.map((w) => w.effectiveWeight).join(', ');

    return {
      id: 'sanatsal',
      labelTr: 'Sanatsal (Analog Editoryal)',
      badgeTr: `Sanatsal · ${boostObj.multiplierText}`,
      toneTitleTr: 'Bağımsız Sanat Galerisi & Analog Editoryal Dergi Tonu',
      toneDescriptionTr:
        'Promptun genel tonunu bağımsız analog sanat fotoğrafçılığına taşır; gümüş-halojen emülsiyon dokusu, negatif alan dengesi ve şiirsel ışık-gölge kontrastına yüksek anahtar kelime ağırlığı verir.',
      weightBoost,
      weightBoostLabelTr: boostObj.labelTr,
      weightedTokens,
      filterDirectiveEn: `[Advanced Style Filter: Artistic Analog Editorial · Keyword Weights: ${weightsString} — indie art-house editorial tone, curated negative space, tactile analog emulsion texture without any artificial digital rendering or plastic skin]`,
      shortFilterEn: `[Style: Artistic Analog · ${weightedTokens[0].effectiveWeight}, ${weightedTokens[1].effectiveWeight}]`,
      filterDirectiveTr: `[İleri Düzey Stil Filtresi: Sanatsal (Analog Editoryal Sanat Tonu · ${boostObj.labelTr} ${boostObj.multiplierText}) — Editoryal sanat kompozisyonu, gümüş-halojen film dokusu ve şiirsel ışık-gölge dengesi ağırlıklandırıldı]`,
    };
  }

  // Default: 'fotogercekci' (Photorealistic Raw Candid)
  const rawTokens: { tokenEn: string; labelTr: string; baseWeight: number }[] = [
    {
      tokenEn: 'raw unretouched non-porcelain skin texture with visible pores',
      labelTr: 'Gözenekli & Porselen Olmayan Doğal Cilt Dokusu',
      baseWeight: 1.25,
    },
    {
      tokenEn: 'unfiltered smartphone camera direct flash realism',
      labelTr: 'Filtresiz Ham Telefon Flaşı Gerçekçiliği',
      baseWeight: 1.22,
    },
    {
      tokenEn: 'natural human facial anatomy & zero airbrush',
      labelTr: 'Doğal Yüz Anatomisi & Sıfır Airbrush',
      baseWeight: 1.2,
    },
    {
      tokenEn: 'authentic Fujifilm 400 handheld home snapshot grain',
      labelTr: 'Otantik Fujifilm 400 Ev Çekimi Greni',
      baseWeight: 1.18,
    },
  ];
  const weightedTokens: WeightedKeywordToken[] = rawTokens.map((t) => {
    const w = (t.baseWeight + d).toFixed(2);
    return {
      ...t,
      effectiveWeight: `(${t.tokenEn}:${w})`,
    };
  });
  const weightsString = weightedTokens.map((w) => w.effectiveWeight).join(', ');

  return {
    id: 'fotogercekci',
    labelTr: 'Fotogerçekçi (Raw Candid)',
    badgeTr: `Fotogerçekçi · ${boostObj.multiplierText}`,
    toneTitleTr: 'Ham Belgesel & Filtresiz Telefon Kamerası Gerçekçilik Tonu',
    toneDescriptionTr:
      'Promptun genel tonunu maksimum fotogerçekçiliğe kilitler; gözenekli doğal ten dokusu, hafif cilt kusurları, ham telefon flaşı ve gerçekçi el/yüz anatomisi anahtar kelimelerine en yüksek ağırlığı atar.',
    weightBoost,
    weightBoostLabelTr: boostObj.labelTr,
    weightedTokens,
    filterDirectiveEn: `[Advanced Style Filter: Photorealistic Raw Candid · Keyword Weights: ${weightsString} — ultra-authentic documentary realism tone, micro-skin pore priority, zero digital smoothing or plastic sheen]`,
    shortFilterEn: `[Style: Photorealistic Raw · ${weightedTokens[0].effectiveWeight}, ${weightedTokens[1].effectiveWeight}]`,
    filterDirectiveTr: `[İleri Düzey Stil Filtresi: Fotogerçekçi (Ham Belgesel Tonu · ${boostObj.labelTr} ${boostObj.multiplierText}) — Gözenekli doğal ten dokusu, ham telefon flaşı ve sıfır airbrush gerçekçiliği ağırlıklandırıldı]`,
  };
}

export function applyAdvancedFilterToPromptEn(
  promptText: string,
  filterId: AdvancedPromptFilterId,
  weightBoost: KeywordWeightBoost = 'guclu'
): string {
  const spec = getAdvancedPromptFilterSpec(filterId, weightBoost);
  const cleaned = promptText
    .replace(/\s*\[Advanced Style Filter:[^\]]*\]\.?/gi, '')
    .replace(/\s*\[Style:\s*(?:Photorealistic Raw|Cinematic 35mm|Artistic Analog)[^\]]*\]\.?/gi, '');
  const parts = cleaned.split(/\s+--no\s+/i);
  const body = (parts[0] || '').trim().replace(/\.$/, '');
  const neg = parts[1] ? ` --no ${parts[1].trim()}` : '';
  return `${body}. ${spec.filterDirectiveEn}.${neg}`;
}

export function applyAdvancedFilterToScenarioTr(
  scenarioTr: string,
  filterId: AdvancedPromptFilterId,
  weightBoost: KeywordWeightBoost = 'guclu'
): string {
  const spec = getAdvancedPromptFilterSpec(filterId, weightBoost);
  const cleaned = scenarioTr
    .replace(/\s*\[İleri Düzey Stil Filtresi:[^\]]*\]\.?/gi, '')
    .trim()
    .replace(/\.$/, '');
  return `${cleaned}. ${spec.filterDirectiveTr}.`;
}

export function getCameraPathOptimization(
  turnAngle: 'soft' | '180' | '360',
  fps: VideoFpsOption = 24
): {
  modeTitleTr: string;
  timedPromptEn: string;
  timedScenarioTr: string;
  shortCompressedEn: string;
  phases: CameraPathPhase[];
} {
  if (turnAngle === '360') {
    return {
      modeTitleTr: '360° Tam Dönüş · 3 Aşamalı Kamera Yolu & Zamanlamalı Akış',
      timedPromptEn: `[Camera Path Optimization & Timed Action Sequence (${fps}fps)]: [0.0s–1.5s Frontal Anchor & Card Lock]: Eye-level smartphone camera holds a locked frontal frame with direct flash while she stands poised holding the 3-line verification paper clearly at chest height and raises her free index finger to her lips in a gentle "shh" gesture. [1.5s–3.8s Counter-Stabilized 360° Pivot Arc]: As she executes a smooth, measured 360-degree full turn in place on her stiletto high heels, the camera performs a subtle 0.15x counter-stabilized gimbal arc push-in that tracks her center of gravity, preventing perspective warp, motion blur, or facial morphing during the spin. [3.8s–5.0s Frontal Re-Lock & Natural Smile]: Camera settles smoothly into a zero-shake close-medium frontal lock as she completes the 360° turn, holding the 3-line verification card steady at chest height with a warm natural smile and 100% identical facial geometry`,
      timedScenarioTr: `[Kamera Yolu Optimizasyonu · Zamanlamalı Aksiyon Akışı]: [0.0sn–1.5sn Başlangıç & Kağıt Kilidi]: Göz hizasında sabit telefon kamerası ve doğrudan flaş altında 3 satırlı doğrulama kağıdını göğüs hizasında net biçimde tutar ve "sus" (shh) işareti yapar. [1.5sn–3.8sn Dengeli 360° Dönüş & Kamera Takibi]: Yüksek topuklu ayakkabıları üzerinde sakin bir 360° tam dönüş yaparken kamera sarsıntısız mikro yay takibiyle (0.15x counter-stabilized arc) ağırlık merkezini korur, geçiş esnasında yüz ve ışık kırılmasını önler. [3.8sn–5.0sn Ön Kadraj Kilidi & Doğal Gülümseme]: Dönüşü tamamlayıp yeniden kameraya kilitlenir, doğrulama kağıdını sabit tutarak doğal bir gülümsemeyle sahneyi tamamlar`,
      shortCompressedEn: `Timed Camera Path (${fps}fps): [0.0s-1.5s] Static frontal flash lock, holds 3-line card + "shh" gesture; [1.5s-3.8s] Counter-stabilized 0.15x arc tracking during smooth 360° turn in heels; [3.8s-5.0s] Frontal re-lock & natural smile`,
      phases: [
        {
          timeRange: '0.0sn – 1.5sn',
          phaseTitleTr: '1. Ön Kadraj & Kağıt Kilidi',
          cameraPathTr: 'Sabit Göz Hizası + Doğrudan Telefon Flaşı',
          actionTr: '3 satırlı kağıdı göğüs hizasında sabit tutar, yumuşak "shh" işareti yapar.',
        },
        {
          timeRange: '1.5sn – 3.8sn',
          phaseTitleTr: '2. Optimize 360° Dönüş Yolu',
          cameraPathTr: '0.15x Sarsıntısız Mikro Yay Takibi (Gimbal Arc)',
          actionTr: 'Topuklular üzerinde yüz ve perspektif bozulmadan 360° tam dönüş yapar.',
        },
        {
          timeRange: '3.8sn – 5.0sn',
          phaseTitleTr: '3. Yeniden Odak & Bitiş',
          cameraPathTr: 'Sıfır Sarsıntılı Ön Portre Kilidi',
          actionTr: 'Tekrar objektife döner, kağıdı net gösterir ve doğal gülümser.',
        },
      ],
    };
  }

  if (turnAngle === '180') {
    return {
      modeTitleTr: '180° Yarım Dönüş · 3 Aşamalı Kamera Yolu & Zamanlamalı Akış',
      timedPromptEn: `[Camera Path Optimization & Timed Action Sequence (${fps}fps)]: [0.0s–1.5s Frontal Verification Lock]: Eye-level smartphone camera holds steady under direct flash as she displays the 3-line verification paper clearly at chest height and brings her free index finger to her lips in a gentle "shh" gesture. [1.5s–3.5s Lateral Micro-Track & 180° Pivot]: As she pivots 180 degrees in her stiletto high heels, the camera executes a smooth lateral micro-tracking glide (0.15x) to keep her silhouette and heel posture centered without motion blur. [3.5s–5.0s Over-the-Shoulder Focus Lock]: Camera locks focus on her eyes and jawline as she looks back softly over her shoulder into the lens with a warm natural smile`,
      timedScenarioTr: `[Kamera Yolu Optimizasyonu · Zamanlamalı Aksiyon Akışı]: [0.0sn–1.5sn Ön Doğrulama Kilidi]: Sabit telefon flaşı altında 3 satırlı doğrulama kağıdını göğüs hizasında gösterir ve "shh" işareti yapar. [1.5sn–3.5sn Yanal Mikro Takip & 180° Dönüş]: Topuklular üzerinde 180° dönerken kamera hafif yanal kayma (0.15x lateral track) ile silüeti merkezde tutar. [3.5sn–5.0sn Omuz Üstü Göz Odak Kilidi]: Omuz üstünden kameraya bakarken yüz hatları ve doğal ten dokusu net odakla sabitlenir`,
      shortCompressedEn: `Timed Camera Path (${fps}fps): [0.0s-1.5s] Frontal flash lock, holds 3-line card + "shh"; [1.5s-3.5s] Lateral 0.15x micro-track during 180° pivot in heels; [3.5s-5.0s] Over-shoulder eye-contact lock`,
      phases: [
        {
          timeRange: '0.0sn – 1.5sn',
          phaseTitleTr: '1. Ön Doğrulama Kilidi',
          cameraPathTr: 'Sabit Göz Hizası + Telefon Flaşı',
          actionTr: '3 satırlı doğrulama kağıdını gösterir ve "shh" işareti yapar.',
        },
        {
          timeRange: '1.5sn – 3.5sn',
          phaseTitleTr: '2. Yanal Takip & 180° Dönüş',
          cameraPathTr: '0.15x Yumuşak Yanal Kamera Takibi',
          actionTr: 'Topuklular üzerinde zarifçe 180° yarım dönüş gerçekleştirir.',
        },
        {
          timeRange: '3.5sn – 5.0sn',
          phaseTitleTr: '3. Omuz Üstü Odak Kilidi',
          cameraPathTr: 'Yüz & Göz Netlik Kilidi',
          actionTr: 'Omuz üstünden objektife doğal ve sıcak bir gülümsemeyle bakar.',
        },
      ],
    };
  }

  return {
    modeTitleTr: 'Sade & Doğal Akış · 3 Aşamalı Kamera Yolu & Yüz Koruma',
    timedPromptEn: `[Camera Path Optimization & Timed Action Sequence (${fps}fps)]: [0.0s–1.8s Locked Frontal Anchor & Card Legibility]: Zero-shake static smartphone framing with direct camera flash; she stands poised holding the 3-line handwritten verification paper steady at chest height with direct eye contact. [1.8s–3.6s Subtle Optical Push-In & Micro Head Tilt]: Camera performs an imperceptible 0.1x optical push-in toward her face and verification card while she offers a warm, spontaneous natural smile and a gentle 5-degree head tilt with authentic eye blinks. [3.6s–5.0s Steady Verification Hold]: Camera holds razor-sharp focus on her non-porcelain natural skin pores and the 3-line paper with 100% undistorted facial symmetry`,
    timedScenarioTr: `[Kamera Yolu Optimizasyonu · Zamanlamalı Aksiyon Akışı]: [0.0sn–1.8sn Sabit Başlangıç & Kağıt Netliği]: Sıfır sarsıntılı telefon kadrajı ve doğrudan flaş altında 3 satırlı doğrulama kağıdını göğüs hizasında sabit tutarak doğrudan kameraya bakar. [1.8sn–3.6sn Mikro Yakınlaşma & Doğal Gülümseme]: Kamera çok hafif (0.1x) optik yakınlaşma yaparken model başını hafifçe eğer ve sıcak, doğal bir gülümseme sunar. [3.6sn–5.0sn Yüz & Kağıt Odak Kilidi]: Yüz simetrisi ve 3 satırlı kağıt okunurluğu son kareye kadar %100 sabit korunur`,
    shortCompressedEn: `Timed Camera Path (${fps}fps): [0.0s-1.8s] Static phone flash lock on 3-line card & face; [1.8s-3.6s] 0.1x micro push-in + warm smile & gentle head tilt; [3.6s-5.0s] Steady facial & card focus hold`,
    phases: [
      {
        timeRange: '0.0sn – 1.8sn',
        phaseTitleTr: '1. Sabit Flaş & Kağıt Kilidi',
        cameraPathTr: '0x Sabit Telefon Kadrajı',
        actionTr: '3 satırlı doğrulama kağıdını göğüs hizasında sabit tutar, göz teması kurar.',
      },
      {
        timeRange: '1.8sn – 3.6sn',
        phaseTitleTr: '2. Mikro Optik Yaklaşma',
        cameraPathTr: '0.1x Yumuşak Optik Push-In',
        actionTr: 'Yüz hatları bozulmadan doğal gülümseme ve hafif baş eğimi yapar.',
      },
      {
        timeRange: '3.6sn – 5.0sn',
        phaseTitleTr: '3. Netlik & Simetri Kilidi',
        cameraPathTr: 'Yüz Gözenek & Kağıt Odak Sabitleme',
        actionTr: 'Sakin nefes akışıyla doğrulama pozunu son kareye kadar korur.',
      },
    ],
  };
}

export function applyCameraPathToPromptEn(
  text: string,
  turnAngle: 'soft' | '180' | '360',
  fps: VideoFpsOption,
  cameraPathOptimized: boolean
): string {
  const spec = getCameraPathOptimization(turnAngle, fps);
  const cleaned = text.replace(
    /\s*\[Camera Path Optimization & Timed Action Sequence[^\]]*\]:[^-]*?(?=\s*--no\b|$)/gi,
    ''
  );
  if (!cameraPathOptimized) {
    return cleaned.trim();
  }
  const noSplit = cleaned.split(/\s+--no\s+/i);
  const body = noSplit[0].trim().replace(/\.$/, '');
  const neg = noSplit[1] ? ` --no ${noSplit[1].trim()}` : '';
  return `${body}. ${spec.timedPromptEn}.${neg}`;
}

export function applyCameraPathToScenarioTr(
  text: string,
  turnAngle: 'soft' | '180' | '360',
  fps: VideoFpsOption,
  cameraPathOptimized: boolean
): string {
  const spec = getCameraPathOptimization(turnAngle, fps);
  const cleaned = text.replace(
    /\s*\[Kamera Yolu Optimizasyonu · Zamanlamalı Aksiyon Akışı\]:.*$/g,
    ''
  );
  if (!cameraPathOptimized) {
    return cleaned.trim();
  }
  return `${cleaned.trim().replace(/\.$/, '')}. ${spec.timedScenarioTr}.`;
}

export function evaluateVisualQualityBaseline(params: {
  videoPromptEn: string;
  turnAngle: 'soft' | '180' | '360';
  fps: VideoFpsOption;
  cameraPathOptimized: boolean;
  verificationHeader: string;
  verificationDate: string;
  verificationWebsite: string;
  hasReferenceImage: boolean;
}): VisualQualityAnalysis {
  const promptLower = params.videoPromptEn.toLowerCase();
  const missingDetails: MissingDetailWarning[] = [];

  // 1. Skin & Non-Porcelain Texture Score
  let skinNaturalnessScore = 96;
  if (!promptLower.includes('non-porcelain') && !promptLower.includes('imperfections')) {
    skinNaturalnessScore -= 18;
    missingDetails.push({
      id: 'missing-non-porcelain-skin',
      titleTr: 'Eksik Detay: Doğal Cilt Kusurları (Anti-Porselen Doku)',
      descriptionTr:
        'Prompt içinde porselen görünümü engelleyen "non-porcelain unretouched skin with slight imperfections" ifadesi zayıf.',
      actionLabelTr: 'Doğal Cilt Dokusunu Ekle',
      fixType: 'inject_prompt_detail',
      snippetEn:
        'non-porcelain unretouched skin with slight natural skin imperfections and visible fine pores',
    });
  }

  // 2. Phone Flash & Everyday Home Realism Score
  let phoneFlashRealismScore = 95;
  if (!promptLower.includes('smartphone camera') && !promptLower.includes('flash')) {
    phoneFlashRealismScore -= 20;
    missingDetails.push({
      id: 'missing-phone-flash',
      titleTr: 'Eksik Detay: Flaşlı Ham Telefon Çekimi Vurgusu',
      descriptionTr:
        'Düşük ışıklı ev ortamında patlayan doğrudan telefon flaşı ("direct camera flash burst, unfiltered raw candid") detayı eksik.',
      actionLabelTr: 'Telefon Flaşı Detayını Ekle',
      fixType: 'inject_prompt_detail',
      snippetEn:
        'shot on a smartphone camera, slightly soft low-light indoor atmosphere, harsh direct camera flash burst, unfiltered raw candid photo',
    });
  }

  // 3. Verification Card 3-Line Completeness Score
  let verificationCardScore = 98;
  if (!params.verificationWebsite.trim()) {
    verificationCardScore = 82;
    missingDetails.push({
      id: 'missing-card-line3',
      titleTr: 'Eksik Detay: Kağıt 3. Satır (Web Sitesi / Platform) Boş',
      descriptionTr:
        'Doğrulama kağıdının 3. satırı boş bırakılmış. 3 satırlı el yazısının tam görünmesi için 3. satırı doldurmanız önerilir.',
      actionLabelTr: '3. Satıra "vespera.com" Ekle',
      fixType: 'fill_line3',
    });
  }

  // 4. Camera Path & Motion Sequence Score
  let cameraPathMotionScore = 96;
  if (!params.cameraPathOptimized) {
    cameraPathMotionScore -= 22;
    missingDetails.push({
      id: 'missing-camera-path-opt',
      titleTr: 'Eksik Detay: Kamera Yolu Optimizasyonu Kapalı',
      descriptionTr:
        'Seçilen hareket stili için zamanlamalı aksiyon akışı ([0.0s–1.5s], [1.5s–3.8s], [3.8s–5.0s]) ve kamera takip optimizasyonu aktif değil.',
      actionLabelTr: 'Kamera Yolu Optimizasyonunu Aç',
      fixType: 'enable_camera_path',
    });
  }

  if (params.turnAngle === '360' && params.fps === 24) {
    cameraPathMotionScore -= 10;
    missingDetails.push({
      id: 'recommend-60fps-for-360',
      titleTr: 'Önerilen Detay: 360° Dönüş İçin 60 FPS Akıcılık',
      descriptionTr:
        '360° tam dönüş hareketinde hareket bulanıklığını ve yüz kaymasını en aza indirmek için 60 FPS seçilmesi önerilir.',
      actionLabelTr: '60 FPS Hızına Geç',
      fixType: 'switch_fps_60',
    });
  }

  if (!params.hasReferenceImage && params.turnAngle !== 'soft') {
    skinNaturalnessScore -= 4;
  }

  const overallScore = Math.max(
    45,
    Math.min(
      100,
      Math.round(
        skinNaturalnessScore * 0.28 +
          phoneFlashRealismScore * 0.24 +
          verificationCardScore * 0.22 +
          cameraPathMotionScore * 0.26
      )
    )
  );

  const summaryTr =
    missingDetails.length === 0
      ? `Görsel kalite ve detay yoğunluğu üst seviyede (${overallScore}/100). Flaşlı ham telefon çekimi, porselen olmayan doğal ten dokusu, 3 satırlı doğrulama kağıdı ve zamanlamalı kamera yolu tam uyumlu.`
      : `Görsel kalite puanı ${overallScore}/100. Videoda maksimum gerçekçilik ve sıfır yüz bozulması için aşağıdaki ${missingDetails.length} eksik detayı tek tıkla tamamlayabilirsiniz.`;

  return {
    overallScore,
    skinNaturalnessScore,
    phoneFlashRealismScore,
    verificationCardScore,
    cameraPathMotionScore,
    summaryTr,
    missingDetails,
    isAiAnalyzed: false,
  };
}

export function evaluateFiveConceptQualityProgression(params: {
  activeSettingId: string;
  activeLightingMode: LightingModeId;
  activeScoreOverride?: number;
  hairId: string;
  wardrobeId: string;
  turnAngle: 'soft' | '180' | '360';
  fps: VideoFpsOption;
  videoSpeed: VideoSpeedOption;
  cameraPathOptimized: boolean;
  verificationHeader: string;
  verificationDate: string;
  verificationWebsite: string;
  hasReferenceImage: boolean;
}): ConceptQualityPoint[] {
  const conceptMeta: {
    settingId: string;
    code: string;
    shortTitleTr: string;
    fullTitleTr: string;
    baseSpecialtyBonus: number;
  }[] = [
    {
      settingId: 'casual-everyday-home',
      code: 'K1',
      shortTitleTr: 'Günlük Oda',
      fullTitleTr: 'Konsept 1: Günlük Ev Yatak Odası',
      baseSpecialtyBonus: 2,
    },
    {
      settingId: 'modern-wood-doorway',
      code: 'K2',
      shortTitleTr: 'Kapı Önü',
      fullTitleTr: 'Konsept 2: Ahşap Oda Kapısı & Koridor',
      baseSpecialtyBonus: 0,
    },
    {
      settingId: 'luxury-hotel-suite-drapes',
      code: 'K3',
      shortTitleTr: 'Loş Otel/Oda',
      fullTitleTr: 'Konsept 3: Koyu Perdeli Loş Yatak Odası',
      baseSpecialtyBonus: 1,
    },
    {
      settingId: 'dressing-room-vanity-mirror',
      code: 'K4',
      shortTitleTr: 'Boy Aynası',
      fullTitleTr: 'Konsept 4: Ev Giyinme & Boy Aynası Önü',
      baseSpecialtyBonus: 3,
    },
    {
      settingId: 'italian-marble-bathroom',
      code: 'K5',
      shortTitleTr: 'Ev Banyosu',
      fullTitleTr: 'Konsept 5: Ev Banyosu & Ayna Flaşı',
      baseSpecialtyBonus: 1,
    },
  ];

  return conceptMeta.map((item, idx) => {
    const isCurrent = item.settingId === params.activeSettingId;
    const modeId = isCurrent
      ? params.activeLightingMode
      : getDefaultLightingModeForSetting(item.settingId);
    const lightHarmony = getEnvironmentLightingHarmony(item.settingId, modeId);
    const conflicts = detectPromptConflicts({
      hairId: params.hairId,
      wardrobeId: params.wardrobeId,
      settingId: item.settingId,
      turnAngle: params.turnAngle,
    });

    const pkg = buildCompletePackage({
      hairId: params.hairId,
      wardrobeId: params.wardrobeId,
      settingId: item.settingId,
      turnAngle: params.turnAngle,
      fps: params.fps,
      videoSpeed: params.videoSpeed,
      lightingMode: modeId,
      cameraPathOptimized: params.cameraPathOptimized,
      verificationHeader: params.verificationHeader,
      verificationDate: params.verificationDate,
      verificationWebsite: params.verificationWebsite,
    });

    const baseEval = evaluateVisualQualityBaseline({
      videoPromptEn: pkg.videoPrompt.runwayEn,
      turnAngle: params.turnAngle,
      fps: params.fps,
      cameraPathOptimized: params.cameraPathOptimized,
      verificationHeader: params.verificationHeader,
      verificationDate: params.verificationDate,
      verificationWebsite: params.verificationWebsite,
      hasReferenceImage: params.hasReferenceImage,
    });

    const conflictPenalty = conflicts.length * 3;
    const lightingMatchBonus = lightHarmony.isRecommendedForRoom ? 2 : -1;
    const computedScore = Math.max(
      55,
      Math.min(
        100,
        baseEval.overallScore +
          item.baseSpecialtyBonus +
          lightingMatchBonus -
          conflictPenalty
      )
    );

    const finalScore =
      isCurrent && typeof params.activeScoreOverride === 'number'
        ? params.activeScoreOverride
        : computedScore;

    return {
      conceptIndex: idx + 1,
      code: item.code,
      settingId: item.settingId,
      shortTitleTr: item.shortTitleTr,
      fullTitleTr: item.fullTitleTr,
      lightingModeId: modeId,
      lightingLabelTr: lightHarmony.modeLabelTr,
      kelvinBadge: lightHarmony.kelvinBadge,
      score: finalScore,
      skinScore: baseEval.skinNaturalnessScore,
      flashScore: lightHarmony.lightingQualityScore,
      motionScore: baseEval.cameraPathMotionScore,
      isCurrent,
    };
  });
}

export function detectPromptConflicts(params: {
  hairId: string;
  wardrobeId: string;
  settingId: string;
  turnAngle: 'soft' | '180' | '360';
  resolvedConflictIds?: string[];
}): PromptConflictWarning[] {
  const { hairId, wardrobeId, settingId, turnAngle, resolvedConflictIds = [] } = params;
  const warnings: PromptConflictWarning[] = [];

  const hairLabel =
    HAIR_OPTIONS.find((h) => h.id === hairId)?.labelTr.split('·')[0].trim() || 'Seçili Saç';
  const wardLabel =
    WARDROBE_OPTIONS.find((w) => w.id === wardrobeId)?.labelTr.split('+')[0].trim() ||
    'Seçili Kıyafet';
  const setLabel =
    SETTING_OPTIONS.find((s) => s.id === settingId)?.labelTr.split(':')[0].trim() || 'Seçili Ortam';

  // 1. Hair × Wardrobe: Long loose hair obscuring halter-neck keyhole lace straps
  const isLongDownHair = [
    'platinum-waves-roots',
    'honey-blonde-sleek',
    'espresso-brunette-waves',
    'copper-auburn-curls',
  ].includes(hairId);

  if (wardrobeId === 'emerald-halter-lace-cuff' && isLongDownHair) {
    warnings.push({
      id: 'conflict-hair-halter-neck',
      severity: 'high',
      categoryTr: 'Saç × Kıyafet Çakışması',
      conflictingItemsTr: `${hairLabel} + ${wardLabel}`,
      titleTr: 'Uzun Açık Saçlar Halter Yaka & Damla Dekolte Detayını Örtüyor',
      descriptionTr:
        'Omuzlardan göğse dökülen uzun saç telleri, boyundan bağlı halter yaka (keyhole) dantel askılarla üst üste binerek AI görsel/video üretiminde dantel ve saç dokusunun birbirine karışmasına yol açabilir.',
      recommendationTr:
        'Boyun ve halter yaka kesimini net göstermek için toplu saç stiline geçin veya mevcut saçınızı omuz arkasına sabitleyen prompt uzlaştırmasını uygulayın.',
      harmonyPatchEn:
        'Conflict Resolution: Her long hair is swept neatly behind her shoulders and back so the emerald-green halter-neck keyhole lace straps and neckline remain 100% unobstructed with zero hair-into-lace clipping',
      harmonyPatchTr:
        '[Çakışma Çözümü: Halter yaka ve damla dekolte detayının kapanmaması için uzun saçlar omuzların arkasına zarifçe alınmıştır]',
      resolutions: [
        {
          id: 'res-halter-updo',
          labelTr: 'Saçı "Şampanya Dağınık Topuz" Yap',
          actionType: 'change_hair',
          targetValue: 'champagne-messy-updo',
        },
        {
          id: 'res-halter-patch',
          labelTr: 'Seçimi Koru & Saçı Omuz Arkasına Sabitle',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  // 2. Hair × Wardrobe: Blonde/Platinum hair merging with Pearl-Champagne Silk Robe under flash
  const isLightBlondeHair = [
    'platinum-waves-roots',
    'honey-blonde-sleek',
    'champagne-messy-updo',
    'golden-space-buns',
  ].includes(hairId);

  if (wardrobeId === 'pearl-champagne-satin-robe' && isLightBlondeHair) {
    warnings.push({
      id: 'conflict-blonde-satin-robe',
      severity: 'medium',
      categoryTr: 'Saç × Kıyafet Ton Çakışması',
      conflictingItemsTr: `${hairLabel} + ${wardLabel}`,
      titleTr: 'Açık Sarı Saç & İnci Beyazı İpek Sabahlık Flaş Altında Ton Kaybı Yaratabilir',
      descriptionTr:
        'Doğrudan patlayan telefon flaşı altında açık sarı/platin saç uçları ile omuzlardan süzülen şampanya/inci beyazı ipek sabahlık aynı parlaklık tonunda birleşerek sınır kaybı oluşturabilir.',
      recommendationTr:
        'Yüksek kontrast için koyu kestane saça geçebilir ya da saç ile ipek kumaş arasına mikro gölge ayrımı ekleyen prompt çözümünü uygulayabilirsiniz.',
      harmonyPatchEn:
        'Conflict Resolution: Distinct tonal shadow separation and natural specular contrast between her blonde hair strands and the pearl-champagne sheer silk robe to prevent flash overexposure merging',
      harmonyPatchTr:
        '[Çakışma Çözümü: Flaş altında sarı saç telleri ile inci beyazı ipek sabahlık arasına doğal ton ve gölge ayrımı eklendi]',
      resolutions: [
        {
          id: 'res-blonde-robe-hair',
          labelTr: 'Saçı "Koyu Kestane Dalgalar" Yap',
          actionType: 'change_hair',
          targetValue: 'espresso-brunette-waves',
        },
        {
          id: 'res-blonde-robe-patch',
          labelTr: 'Seçimi Koru & Ton Ayrımı Ekle',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  // 3. Hair × Wardrobe: Space-buns choker necklace clashing with cross-front straps or gold hardware
  if (
    hairId === 'golden-space-buns' &&
    (wardrobeId === 'crimson-black-corset-heels' || wardrobeId === 'ruby-velvet-bustier-gold')
  ) {
    warnings.push({
      id: 'conflict-spacebuns-choker-corset',
      severity: 'medium',
      categoryTr: 'Saç Profili × Kıyafet Yaka Çakışması',
      conflictingItemsTr: `${hairLabel} + ${wardLabel}`,
      titleTr: 'Boyun Aksesuarı (Choker) ile Çapraz Göğüs Bantları / Metal Detaylar Çakışıyor',
      descriptionTr:
        'Çift üst topuz profilindeki boyun aksesuarı, seçilen korsenin çapraz göğüs bantları veya altın metal detaylarıyla birleştiğinde boyun hattında karmaşık çizgiler üretebilir.',
      recommendationTr:
        'Boyun aksesuarı içermeyen dağınık topuza geçin veya boyun hattını sadeleştiren prompt uzlaştırmasını uygulayın.',
      harmonyPatchEn:
        'Conflict Resolution: Clean, bare neckline without any extra choker necklace so the corset straps and bustier neckline hardware remain crisp and uncluttered',
      harmonyPatchTr:
        '[Çakışma Çözümü: Korse bantlarının net görünmesi için boyun aksesuarı karmaşası sadeleştirildi]',
      resolutions: [
        {
          id: 'res-choker-updo',
          labelTr: 'Saçı "Şampanya Dağınık Topuz" Yap',
          actionType: 'change_hair',
          targetValue: 'champagne-messy-updo',
        },
        {
          id: 'res-choker-patch',
          labelTr: 'Seçimi Koru & Boyun Hattını Sadeleştir',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  // 4. Wardrobe × Setting: Dark black/crimson outfit in dark-curtain low-light room
  if (
    settingId === 'luxury-hotel-suite-drapes' &&
    (wardrobeId === 'obsidian-silk-slip-louboutin' || wardrobeId === 'crimson-black-corset-heels')
  ) {
    warnings.push({
      id: 'conflict-dark-outfit-dark-room',
      severity: 'high',
      categoryTr: 'Kıyafet × Ortam Kontrast Çakışması',
      conflictingItemsTr: `${wardLabel} + ${setLabel}`,
      titleTr: 'Koyu Renk Kıyafet & Siyah Stiletto, Loş Koyu Perdeler Önünde Kaybolabilir',
      descriptionTr:
        'Siyah/bordo dantel kombin ve siyah rugan stilettolar, koyu perdeli düşük ışıklı oda arka planıyla birleştiğinde kıyafet konturu ve bacak silüeti karanlıkta eriyebilir.',
      recommendationTr:
        'Açık tonlu Günlük Ev Odasına geçin, İnci Beyazı Saten kombini seçin veya kıyafeti arka plandan ayıran kontur ışığı (rim light) çözümünü uygulayın.',
      harmonyPatchEn:
        'Conflict Resolution: Subtle warm ambient rim-light separation behind the subject so the dark lace/silk silhouette and black stiletto heels stand out sharply against the dark bedroom curtains',
      harmonyPatchTr:
        '[Çakışma Çözümü: Koyu kıyafet ve siyah stilettoların koyu perdeler önünde kaybolmaması için arka kontur ayrımı eklendi]',
      resolutions: [
        {
          id: 'res-dark-room-setting',
          labelTr: 'Ortamı "Günlük Ev Odası" Yap',
          actionType: 'change_setting',
          targetValue: 'casual-everyday-home',
        },
        {
          id: 'res-dark-room-wardrobe',
          labelTr: 'Kıyafeti "İnci Beyazı Saten" Yap',
          actionType: 'change_wardrobe',
          targetValue: 'pearl-champagne-satin-robe',
        },
        {
          id: 'res-dark-room-patch',
          labelTr: 'Seçimi Koru & Kontur Işığı Ekle',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  // 5. Wardrobe × Setting: Heavy velvet/structured corset + high heels in compact Bathroom Mirror setting
  if (
    settingId === 'italian-marble-bathroom' &&
    (wardrobeId === 'ruby-velvet-bustier-gold' ||
      wardrobeId === 'crimson-black-corset-heels' ||
      wardrobeId === 'pearl-champagne-satin-robe')
  ) {
    warnings.push({
      id: 'conflict-bathroom-evening-heels',
      severity: 'high',
      categoryTr: 'Kıyafet × Ortam Kadraj Çakışması',
      conflictingItemsTr: `${wardLabel} + ${setLabel}`,
      titleTr: 'Ev Banyosu Lavabo Aynası, Tam Boy Stiletto ve Korse Kadrajını Kısıtlayabilir',
      descriptionTr:
        'Banyo aynası ortamında lavabo tezgahı tam boy (head-to-heels) stiletto görünümünü kesebilir ve fayanslardan yansıyan sert flaş kadife/saten dokuyu patlatabilir.',
      recommendationTr:
        'Tam boy kombin için Ev Giyinme Köşesi & Boy Aynası ortamına geçin ya da banyo sahnesini tam boy zemin aynasına göre optimize edin.',
      harmonyPatchEn:
        'Conflict Resolution: Wide full-length floor-to-ceiling bathroom mirror perspective with unobstructed floor space so her entire outfit and stiletto high heels are visible head-to-toe without sink cropping or tile flash glare',
      harmonyPatchTr:
        '[Çakışma Çözümü: Banyo ortamında lavabo kesintisi olmadan baştan ayağa stiletto kadrajı ve dengeli flaş yansıması tanımlandı]',
      resolutions: [
        {
          id: 'res-bath-setting',
          labelTr: 'Ortamı "Ayna Karşısı: Ev Giyinme Köşesi" Yap',
          actionType: 'change_setting',
          targetValue: 'dressing-room-vanity-mirror',
        },
        {
          id: 'res-bath-patch',
          labelTr: 'Seçimi Koru & Tam Boy Kadrajı Uzlaştır',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  // 6. Hair × Setting: High-gloss blonde hair + mirror environment + direct smartphone flash glare
  if (
    (hairId === 'platinum-waves-roots' || hairId === 'honey-blonde-sleek') &&
    (settingId === 'casual-everyday-home' ||
      settingId === 'dressing-room-vanity-mirror' ||
      settingId === 'italian-marble-bathroom')
  ) {
    warnings.push({
      id: 'conflict-glossy-hair-mirror-flash',
      severity: 'medium',
      categoryTr: 'Saç × Ortam Flaş Yansıması Çakışması',
      conflictingItemsTr: `${hairLabel} + ${setLabel} (Boy Aynası & Telefon Flaşı)`,
      titleTr: 'Parlak Sarı Saç & Ayna Önü Flaş Patlaması Beyaz Kağıt Okunurluğunu Düşürebilir',
      descriptionTr:
        'Aynalı ev ortamında doğrudan patlayan telefon flaşı, yüksek parlaklıktaki platin/bal sarısı saçlardan ve arka aynadan sekerek beyaz doğrulama kağıdı üzerinde aşırı parlama (flash hotspot) yaratabilir.',
      recommendationTr:
        'Flaş patlamasının kağıt yazısını ve saç tellerini eritmemesi için 15° açılı telefon flaşı uzlaştırmasını uygulayın veya ahşap kapı önü ortamına geçin.',
      harmonyPatchEn:
        'Conflict Resolution: Smartphone flash is angled 15-degrees off-axis from the background mirror so there is zero blown-out white flash orb behind her blonde hair and the 3-line handwritten verification paper remains 100% high-contrast and legible',
      harmonyPatchTr:
        '[Çakışma Çözümü: Ayna ve parlak sarı saçta flaş patlamasını önleyen 15° açılı telefon flaşı ve kağıt okunurluk kilidi eklendi]',
      resolutions: [
        {
          id: 'res-flash-patch',
          labelTr: 'Seçimi Koru & 15° Açılı Flaş Kilidi Ekle',
          actionType: 'apply_harmony_patch',
        },
        {
          id: 'res-flash-setting',
          labelTr: 'Ortamı "Ev Girişi / Ahşap Kapı Önü" Yap',
          actionType: 'change_setting',
          targetValue: 'modern-wood-doorway',
        },
      ],
    });
  }

  // 7. Setting × Motion / Wardrobe: Narrow apartment hallway doorway with 180/360 spin or draped robe
  if (
    settingId === 'modern-wood-doorway' &&
    (turnAngle !== 'soft' || wardrobeId === 'pearl-champagne-satin-robe')
  ) {
    warnings.push({
      id: 'conflict-narrow-doorway-spin',
      severity: 'high',
      categoryTr: 'Ortam × Hareket / Kıyafet Alan Çakışması',
      conflictingItemsTr: `${setLabel} + ${
        turnAngle !== 'soft' ? `${turnAngle}° Dönüş` : wardLabel
      }`,
      titleTr: 'Dar Koridor / Kapı Önü Alanı Dönüş Hareketi ve Uçuşan Kumaş İçin Dar Kalabilir',
      descriptionTr:
        'Ahşap oda kapısı ve koridor önünde dönüş hareketi veya omuzdan dökülen sabahlık seçildiğinde, video üretiminde kollar ve kumaş kapı pervazıyla iç içe geçebilir.',
      recommendationTr:
        'Geniş Günlük Ev Odasına geçin, hareketi Sade Gülümsemeye alın veya koridor genişliğini prompt içinde artırın.',
      harmonyPatchEn:
        'Conflict Resolution: Wide, spacious open apartment hallway clearance around the wooden doorway giving full 360-degree physical room for her heels and garment movement without touching walls or doorframes',
      harmonyPatchTr:
        '[Çakışma Çözümü: Kapı önü ve koridor derinliği dönüş hareketine uygun şekilde genişletildi]',
      resolutions: [
        {
          id: 'res-door-setting',
          labelTr: 'Ortamı "Günlük Ev Odası" Yap',
          actionType: 'change_setting',
          targetValue: 'casual-everyday-home',
        },
        {
          id: 'res-door-patch',
          labelTr: 'Seçimi Koru & Koridor Alanını Genişlet',
          actionType: 'apply_harmony_patch',
        },
      ],
    });
  }

  return warnings.filter((w) => !resolvedConflictIds.includes(w.id));
}

export function buildBatchReconciliationPlan(params: {
  hairId: string;
  wardrobeId: string;
  settingId: string;
  turnAngle: 'soft' | '180' | '360';
  lightingMode: LightingModeId;
  fps: VideoFpsOption;
  videoSpeed: VideoSpeedOption;
  cameraPathOptimized: boolean;
  motionIntensity: number;
  advancedFilterId: AdvancedPromptFilterId;
  keywordWeightBoost: KeywordWeightBoost;
  verificationHeader: string;
  verificationDate: string;
  verificationWebsite: string;
  activeConflicts: PromptConflictWarning[];
  currentQualityScore: number;
}): BatchReconciliationPlan {
  const {
    hairId,
    wardrobeId,
    settingId,
    turnAngle,
    lightingMode,
    fps,
    cameraPathOptimized,
    motionIntensity,
    advancedFilterId,
    keywordWeightBoost,
    verificationHeader,
    verificationDate,
    verificationWebsite,
    activeConflicts,
    currentQualityScore,
  } = params;

  const hairLabel =
    HAIR_OPTIONS.find((h) => h.id === hairId)?.labelTr.split('·')[0].trim() || 'Seçili Saç';
  const wardLabel =
    WARDROBE_OPTIONS.find((w) => w.id === wardrobeId)?.labelTr.split('+')[0].trim() ||
    'Seçili Kıyafet';
  const setLabel =
    SETTING_OPTIONS.find((s) => s.id === settingId)?.labelTr.split(':')[0].trim() || 'Seçili Ortam';

  const lightHarmony = getEnvironmentLightingHarmony(settingId, lightingMode);
  const filterSpec = getAdvancedPromptFilterSpec(advancedFilterId, keywordWeightBoost);

  // Determine smart conflict-free preset targets if the user chooses Mode 2 (Full Smart Preset Auto-Repair)
  let nextHairId = hairId;
  let nextWardrobeId = wardrobeId;
  let nextSettingId = settingId;
  const changesMadeTr: string[] = [];

  // Resolve Hair × Wardrobe conflicts via smart preset
  if (
    wardrobeId === 'emerald-halter-lace-cuff' &&
    [
      'platinum-waves-roots',
      'honey-blonde-sleek',
      'espresso-brunette-waves',
      'copper-auburn-curls',
    ].includes(hairId)
  ) {
    nextHairId = 'champagne-messy-updo';
    changesMadeTr.push(
      'Halter yaka dantel detayının örtülmemesi için saç "Şampanya Dağınık Topuz" olarak optimize edildi'
    );
  } else if (
    wardrobeId === 'pearl-champagne-satin-robe' &&
    [
      'platinum-waves-roots',
      'honey-blonde-sleek',
      'champagne-messy-updo',
      'golden-space-buns',
    ].includes(hairId)
  ) {
    nextHairId = 'espresso-brunette-waves';
    changesMadeTr.push(
      'İnci beyazı ipek sabahlık ile flaş altında yüksek kontrast için saç "Koyu Kestane Dalgalar" yapıldı'
    );
  } else if (
    hairId === 'golden-space-buns' &&
    (wardrobeId === 'crimson-black-corset-heels' || wardrobeId === 'ruby-velvet-bustier-gold')
  ) {
    nextHairId = 'champagne-messy-updo';
    changesMadeTr.push(
      'Boyun aksesuarı ile korse bantlarının çakışmaması için saç "Şampanya Dağınık Topuz" yapıldı'
    );
  }

  // Resolve Wardrobe × Setting / Hair × Mirror conflicts via smart preset
  if (
    settingId === 'luxury-hotel-suite-drapes' &&
    (wardrobeId === 'obsidian-silk-slip-louboutin' || wardrobeId === 'crimson-black-corset-heels')
  ) {
    nextSettingId = 'casual-everyday-home';
    changesMadeTr.push(
      'Koyu kombin ve siyah stilettoların loş perdelerde kaybolmaması için ortam "Günlük Ev Odası" yapıldı'
    );
  } else if (
    settingId === 'italian-marble-bathroom' &&
    (wardrobeId === 'ruby-velvet-bustier-gold' ||
      wardrobeId === 'crimson-black-corset-heels' ||
      wardrobeId === 'pearl-champagne-satin-robe')
  ) {
    nextSettingId = 'dressing-room-vanity-mirror';
    changesMadeTr.push(
      'Tam boy stiletto ve korse kadrajının lavabo tezgahıyla kesilmemesi için ortam "Ev Giyinme Köşesi" yapıldı'
    );
  } else if (
    settingId === 'modern-wood-doorway' &&
    (turnAngle !== 'soft' || wardrobeId === 'pearl-champagne-satin-robe')
  ) {
    nextSettingId = 'casual-everyday-home';
    changesMadeTr.push(
      'Dönüş hareketi ve uçuşan kumaşa tam alan açmak için ortam "Geniş Günlük Ev Odası" yapıldı'
    );
  }

  // If still glossy blonde hair + mirror flash conflict in the target setting, switch hair to warm brunette or setting to doorway if soft
  if (
    (nextHairId === 'platinum-waves-roots' || nextHairId === 'honey-blonde-sleek') &&
    (nextSettingId === 'casual-everyday-home' ||
      nextSettingId === 'dressing-room-vanity-mirror' ||
      nextSettingId === 'italian-marble-bathroom')
  ) {
    if (nextWardrobeId !== 'emerald-halter-lace-cuff') {
      nextHairId = 'espresso-brunette-waves';
      changesMadeTr.push(
        'Ayna önü telefon flaşı parlamasını (hotspot) sıfırlamak için saç "Koyu Kestane Su Dalgası" olarak dengelendi'
      );
    } else {
      nextHairId = 'champagne-messy-updo';
    }
  }

  const nextLightingMode = getDefaultLightingModeForSetting(nextSettingId);
  if (lightingMode !== nextLightingMode || !lightHarmony.isRecommendedForRoom) {
    const recLightLabel =
      LIGHTING_MODE_OPTIONS.find((l) => l.id === nextLightingMode)?.shortLabelTr || 'Doğal';
    changesMadeTr.push(
      `Ev ortamıyla tam Kelvin uyumu için Işık Modu "${recLightLabel}" olarak senkronize edildi`
    );
  }

  const nextFps: VideoFpsOption = turnAngle !== 'soft' && fps < 60 ? 60 : fps;
  if (nextFps !== fps) {
    changesMadeTr.push(
      `${turnAngle}° dönüş hareketinde bulanıklığı önlemek için kare hızı 60 FPS'e yükseltildi`
    );
  }

  if (!cameraPathOptimized) {
    changesMadeTr.push('Zamanlamalı Kamera Yolu Optimizasyonu (Faz 1-2-3) aktif edildi');
  }

  const nextMotionIntensity = motionIntensity > 4 ? 3 : motionIntensity;
  if (nextMotionIntensity !== motionIntensity) {
    changesMadeTr.push(
      'Yüz kimliği ve 3 satırlı kağıt netliği için hareket yoğunluğu 0.30 (3/10 İdeal) seviyesine çekildi'
    );
  }

  const nextKeywordWeightBoost: KeywordWeightBoost =
    keywordWeightBoost === 'standart' ? 'guclu' : keywordWeightBoost;
  if (nextKeywordWeightBoost !== keywordWeightBoost) {
    changesMadeTr.push('Anahtar kelime ağırlığı "Güçlü (:1.30–1.35)" seviyesine çıkarıldı');
  }

  const nextHeader = verificationHeader.trim() || 'VERIFIED';
  const nextDate = verificationDate.trim() || '10.10.2026';
  const nextWebsite = verificationWebsite.trim() || 'vespera.studio';
  const isCardIncomplete =
    !verificationHeader.trim() || !verificationDate.trim() || !verificationWebsite.trim();
  if (isCardIncomplete) {
    changesMadeTr.push('3 satırlı el yazısı doğrulama kağıdındaki eksik satırlar tamamlandı');
  }

  // Diagnostic Step 1: Hair × Wardrobe
  const hairWardrobeConflicts = activeConflicts.filter((c) => c.categoryTr.includes('Saç × Kıyafet') || c.categoryTr.includes('Saç Profili'));
  const step1: QuickRepairDiagnosticStep = {
    id: 'diag-hair-wardrobe',
    stepNumber: 1,
    dimensionTr: 'Saç × Kıyafet Dokusu & Yaka Uyumu',
    status: hairWardrobeConflicts.length > 0 ? 'conflict' : 'optimal',
    currentStateTr:
      hairWardrobeConflicts.length > 0
        ? `${hairLabel} ile ${wardLabel} arasında ${hairWardrobeConflicts.length} doku/yaka çakışması var`
        : `${hairLabel} ve ${wardLabel} yaka/omuz hattı birbiriyle uyumlu`,
    targetActionTr:
      hairWardrobeConflicts.length > 0
        ? 'Omuz arkası saç kilidi ve flaş ton ayrımı direktifi tek adımda eklenir'
        : 'Mevcut saç-kıyafet dengesi korunur',
    scoreGain: hairWardrobeConflicts.length * 3,
  };

  // Diagnostic Step 2: Wardrobe / Hair × Home Setting & Mirror Flash
  const roomConflicts = activeConflicts.filter(
    (c) => !c.categoryTr.includes('Saç × Kıyafet') && !c.categoryTr.includes('Saç Profili')
  );
  const step2: QuickRepairDiagnosticStep = {
    id: 'diag-room-contrast',
    stepNumber: 2,
    dimensionTr: 'Ev Ortamı × Kadraj & Ayna Flaşı Kontrastı',
    status: roomConflicts.length > 0 ? 'conflict' : 'optimal',
    currentStateTr:
      roomConflicts.length > 0
        ? `${setLabel} ortamında ${roomConflicts.length} kadraj/flaş/kontrast çelişkisi tespit edildi`
        : `${setLabel} ortamı tam boy 9:16 kadraj ve flaş yansıması için dengeli`,
    targetActionTr:
      roomConflicts.length > 0
        ? '15° açılı telefon flaşı, arka kontur (rim-light) ve tam boy zemin kadrajı uzlaştırılır'
        : 'Tam boy 9:16 ev ortamı kadrajı korunur',
    scoreGain: roomConflicts.length * 3,
  };

  // Diagnostic Step 3: Environment × Lighting Mode Harmony
  const step3: QuickRepairDiagnosticStep = {
    id: 'diag-lighting-harmony',
    stepNumber: 3,
    dimensionTr: 'Ev Ortamı × Otomatik Işık Modu (Kelvin)',
    status: lightHarmony.isRecommendedForRoom ? 'optimal' : 'suboptimal',
    currentStateTr: lightHarmony.isRecommendedForRoom
      ? `${lightHarmony.modeLabelTr} (${lightHarmony.kelvinBadge}) seçili oda ile tam uyumlu`
      : `Seçili ${lightHarmony.modeLabelTr} ışık, oda için önerilen "${lightHarmony.recommendedModeLabelTr}" modundan farklı`,
    targetActionTr: lightHarmony.isRecommendedForRoom
      ? 'Oda uyumlu otomatik aydınlatma parametreleri aktif'
      : `Oda için ideal "${lightHarmony.recommendedModeLabelTr}" ışık moduna otomatik senkronize edilir`,
    scoreGain: lightHarmony.isRecommendedForRoom ? 0 : 3,
  };

  // Diagnostic Step 4: Motion Style × Camera Path & FPS
  const isMotionSuboptimal = !cameraPathOptimized || (turnAngle !== 'soft' && fps < 60) || motionIntensity > 4;
  const step4: QuickRepairDiagnosticStep = {
    id: 'diag-motion-camera',
    stepNumber: 4,
    dimensionTr: 'Hareket Stili × Kamera Yolu & FPS Senkronu',
    status: isMotionSuboptimal ? 'suboptimal' : 'optimal',
    currentStateTr: isMotionSuboptimal
      ? `${turnAngle === 'soft' ? '0° Sabit' : `${turnAngle}° Dönüş`} · ${fps} FPS · Kamera Yolu: ${
          cameraPathOptimized ? 'Açık' : 'Kapalı'
        } · Yoğunluk: ${motionIntensity}/10`
      : `${turnAngle === 'soft' ? '0° Sabit' : `${turnAngle}° Dönüş`} (${fps} FPS) ve Faz 1-2-3 Kamera Yolu optimize`,
    targetActionTr: isMotionSuboptimal
      ? `Kamera Yolu AÇIK${turnAngle !== 'soft' ? ', 60 FPS akıcı dönüş' : ''} ve 0.30 (3/10) yüz koruma hızı uygulanır`
      : 'Zamanlamalı kamera yolu ve kare hızı optimum seviyede',
    scoreGain: (!cameraPathOptimized ? 4 : 0) + (turnAngle !== 'soft' && fps < 60 ? 3 : 0),
  };

  // Diagnostic Step 5: 3-Line Verification Card Legibility
  const step5: QuickRepairDiagnosticStep = {
    id: 'diag-verification-card',
    stepNumber: 5,
    dimensionTr: '3 Satır El Yazısı Doğrulama Kağıdı Kilidi',
    status: isCardIncomplete ? 'suboptimal' : 'optimal',
    currentStateTr: isCardIncomplete
      ? '3 satırlı doğrulama kağıdında boş bırakılmış satır bulunuyor'
      : `"${nextHeader} / ${nextDate} / ${nextWebsite}" 3 satır eksiksiz`,
    targetActionTr: isCardIncomplete
      ? 'Eksik satırlar tamamlanır ve parmakların yazıyı kapatmaması garanti altına alınır'
      : '3 satırlı kağıt netliği ve el anatomisi kilidi korunur',
    scoreGain: isCardIncomplete ? 5 : 0,
  };

  // Diagnostic Step 6: Advanced Style Filter & Keyword Weighting
  const isWeightSuboptimal = keywordWeightBoost === 'standart';
  const step6: QuickRepairDiagnosticStep = {
    id: 'diag-filter-weight',
    stepNumber: 6,
    dimensionTr: 'Stil Filtresi & Anahtar Kelime Ağırlık Gücü',
    status: isWeightSuboptimal ? 'suboptimal' : 'optimal',
    currentStateTr: `${filterSpec.labelTr} (${filterSpec.badgeTr}) · ${filterSpec.weightBoostLabelTr}`,
    targetActionTr: isWeightSuboptimal
      ? `${filterSpec.labelTr} tonu korunarak anahtar kelime ağırlığı Güçlü (:1.30–1.35) çarpanına yükseltilir`
      : `${filterSpec.labelTr} stil ağırlıkları maksimum netlikte`,
    scoreGain: isWeightSuboptimal ? 2 : 0,
  };

  const diagnosticSteps = [step1, step2, step3, step4, step5, step6];
  const totalIssuesCount =
    activeConflicts.length +
    diagnosticSteps.filter((d) => d.status === 'suboptimal').length;

  // Synthesize Unified Batch Harmony Patch (EN & TR)
  const unifiedHarmonyPatchEn =
    activeConflicts.length > 0
      ? `Unified Batch Conflict Reconciliation (${activeConflicts.length}-Point Studio Harmony Lock): ${activeConflicts
          .map((c, idx) => `(${idx + 1}) ${c.harmonyPatchEn.replace(/^Conflict Resolution:\s*/i, '')}`)
          .join('; ')}; maintaining 100% unobstructed 3-line handwritten verification paper legibility, 15-degree off-axis smartphone flash balance, and non-porcelain natural skin pores`
      : `Unified Studio Harmony Lock: Zero-clipping hair-to-wardrobe separation, 15-degree off-axis smartphone flash balance, full head-to-heels 9:16 framing, and 100% legible 3-line handwritten verification card`;

  const unifiedHarmonyPatchTr =
    activeConflicts.length > 0
      ? `[Toplu Uzlaştırma Sentezi (${activeConflicts.length} Çakışma Tek Seferde Çözüldü): ${activeConflicts
          .map((c) => c.harmonyPatchTr.replace(/^\[Çakışma Çözümü:\s*|\]$/g, ''))
          .join(' + ')}]`
      : `[Toplu Stüdyo Uyum Kilidi: Saç, kıyafet, 15° açılı telefon flaşı ve 3 satırlı doğrulama kağıdı tek adımda optimize edildi]`;

  const totalScoreGain = diagnosticSteps.reduce((acc, s) => acc + s.scoreGain, 0);
  const estimatedScoreAfterHarmony = Math.min(
    99,
    Math.max(currentQualityScore + Math.max(totalScoreGain, activeConflicts.length > 0 ? 4 : 2), 95)
  );
  const estimatedScoreAfterSmartPreset = Math.min(
    100,
    Math.max(estimatedScoreAfterHarmony + 1, 98)
  );

  if (changesMadeTr.length === 0) {
    changesMadeTr.push(
      'Tüm saç, kıyafet, ev ortamı, ışık modu ve kamera yolu parametreleri tek adımda stüdyo referans standardına kilitlendi'
    );
  }

  return {
    conflictCount: activeConflicts.length,
    totalIssuesCount,
    estimatedScoreBefore: currentQualityScore,
    estimatedScoreAfterHarmony,
    estimatedScoreAfterSmartPreset,
    unifiedHarmonyTitleTr:
      activeConflicts.length > 0
        ? `Toplu Uzlaştırma Önerisi (${activeConflicts.length} Çakışma + Teknik Kalibrasyon)`
        : 'Toplu Stüdyo Konfigürasyon & Kalite Optimizasyonu',
    unifiedHarmonyDescriptionTr:
      activeConflicts.length > 0
        ? `Seçili "${hairLabel}", "${wardLabel}" ve "${setLabel}" kombinasyonundaki ${activeConflicts.length} farklı çakışmayı tek tek çözmek yerine; omuz-yaka ayrımı, 15° açılı telefon flaşı, arka kontur ışığı ve tam boy 9:16 kadraj kurallarını tek bir birleşik direktifte uzlaştırır.`
        : 'Mevcut saç, kıyafet ve ev ortamı seçimlerinizde çakışma bulunmuyor; Hızlı Onarım Sihirbazı ile ışık modu, FPS, kamera yolu ve anahtar kelime ağırlığını tek tıkla maksimum puana taşıyabilirsiniz.',
    unifiedHarmonyPatchEn,
    unifiedHarmonyPatchTr,
    affectedDimensionsTr: activeConflicts.map((c) => c.categoryTr),
    diagnosticSteps,
    smartPresetTarget: {
      hairId: nextHairId,
      wardrobeId: nextWardrobeId,
      settingId: nextSettingId,
      turnAngle,
      lightingMode: nextLightingMode,
      fps: nextFps,
      cameraPathOptimized: true,
      motionIntensity: nextMotionIntensity,
      keywordWeightBoost: nextKeywordWeightBoost,
      verificationHeader: nextHeader,
      verificationDate: nextDate,
      verificationWebsite: nextWebsite,
      summaryTr:
        activeConflicts.length > 0
          ? `${activeConflicts.length} çakışma giderildi ve 6 stüdyo boyutu tek seferde optimize edildi.`
          : 'Mevcut konfigürasyon 6 stüdyo boyutunda maksimum kaliteye optimize edildi.',
      changesMadeTr,
    },
  };
}

export function buildWaveformTimelineBars(params: {
  durationSec: number;
  turnAngle: 'soft' | '180' | '360';
  videoSpeed: VideoSpeedOption;
  barCount?: number;
}): WaveformTimelineBar[] {
  const { durationSec, turnAngle, videoSpeed, barCount = 48 } = params;
  const safeDuration = Math.max(2, durationSec || 8);
  const bars: WaveformTimelineBar[] = [];

  for (let i = 0; i < barCount; i++) {
    const ratio = i / Math.max(1, barCount - 1);
    const timeSec = Number((ratio * safeDuration).toFixed(2));

    // Phase classification (0.0-2.0s Phase 1, 2.0-5.5s Phase 2, 5.5-8.0s Phase 3 scaled to duration)
    let phaseIndex: 0 | 1 | 2 = 0;
    let phaseLabelTr = 'Faz 1 · Başlangıç & Kart Netliği';
    if (ratio >= 0.25 && ratio < 0.6875) {
      phaseIndex = 1;
      phaseLabelTr =
        turnAngle === '360'
          ? 'Faz 2 · 360° Ana Dönüş Akışı'
          : turnAngle === '180'
          ? 'Faz 2 · 180° Yarım Dönüş Akışı'
          : 'Faz 2 · Mikro Push-In & Gülümseme';
    } else if (ratio >= 0.6875) {
      phaseIndex = 2;
      phaseLabelTr = 'Faz 3 · Final Bakış & Sabitleme';
    }

    // Deterministic organic motion/audio waveform envelope based on turnAngle & videoSpeed
    const freqMultiplier = videoSpeed === 2 ? 1.45 : videoSpeed === 0.5 ? 0.72 : 1.0;
    const waveA = Math.sin(i * 0.55 * freqMultiplier + (turnAngle === '360' ? 0.8 : 0.2));
    const waveB = Math.cos(i * 1.15 * freqMultiplier + (turnAngle === '180' ? 1.1 : 0.4));
    const waveC = Math.sin(i * 0.23 + 0.5);

    // Phase 2 (middle action sequence) has higher motion/audio energy, especially for 180/360 spins
    const phaseBoost =
      phaseIndex === 1
        ? turnAngle === '360'
          ? 0.34
          : turnAngle === '180'
          ? 0.26
          : 0.16
        : phaseIndex === 0
        ? 0.12
        : 0.14;

    const rawAmp =
      0.32 +
      phaseBoost +
      0.18 * Math.abs(waveA) +
      0.12 * Math.abs(waveB) +
      0.08 * waveC;

    const amplitude = Number(Math.max(0.18, Math.min(0.98, rawAmp)).toFixed(2));
    const isPeakMoment = amplitude >= 0.78;

    bars.push({
      index: i,
      timeSec,
      amplitude,
      phaseIndex,
      phaseLabelTr,
      isPeakMoment,
    });
  }

  return bars;
}

export interface SceneNoteCategoryMeta {
  id: CanonicalSceneNoteCategory;
  labelTr: string;
  shortLabelTr: string;
  badgeLabelTr: string;
  descriptionTr: string;
  colorHex: string;
  bgTintHex: string;
  borderHex: string;
  textHex: string;
  enPrefix: string;
}

export const SCENE_NOTE_CATEGORIES: SceneNoteCategoryMeta[] = [
  {
    id: 'kamera',
    labelTr: 'Kamera (Lens, Kadraj & 3 Satır Odak)',
    shortLabelTr: 'Kamera',
    badgeLabelTr: 'KAMERA',
    descriptionTr: '28mm lens netleme, optik push-in, handheld kadraj ve 3 satır kağıt odak kilidi',
    colorHex: '#3B82F6',
    bgTintHex: 'rgba(59, 130, 246, 0.14)',
    borderHex: 'rgba(59, 130, 246, 0.55)',
    textHex: '#60A5FA',
    enPrefix: 'Camera & Optical Framing',
  },
  {
    id: 'isik',
    labelTr: 'Işık (15° Telefon Flaşı & Gözenek Dokusu)',
    shortLabelTr: 'Işık',
    badgeLabelTr: 'IŞIK',
    descriptionTr: 'Doğrudan telefon LED flaşı, speküler cilt parlaması ve Fujifilm 400 gren aydınlatması',
    colorHex: '#F59E0B',
    bgTintHex: 'rgba(245, 158, 11, 0.14)',
    borderHex: 'rgba(245, 158, 11, 0.55)',
    textHex: '#FBBF24',
    enPrefix: 'Lighting, Flash & Skin Pores',
  },
  {
    id: 'hareket',
    labelTr: 'Hareket (Dönüş, Poz & Kumaş Fiziği)',
    shortLabelTr: 'Hareket',
    badgeLabelTr: 'HAREKET',
    descriptionTr: '360°/180° topuklu dönüş, doğal mimik, nefes alışverişi ve kumaş/saç ivmesi',
    colorHex: '#10B981',
    bgTintHex: 'rgba(16, 185, 129, 0.14)',
    borderHex: 'rgba(16, 185, 129, 0.55)',
    textHex: '#34D399',
    enPrefix: 'Motion & Subject Choreography',
  },
  {
    id: 'ses',
    labelTr: 'Ses (Foley SFX, Tempo BPM & Akustik Geçiş)',
    shortLabelTr: 'Ses',
    badgeLabelTr: 'SES',
    descriptionTr: 'Topuk adım foley, kağıt hışırtısı, BPM ritim vuruşları ve J-Cut/L-Cut ses geçişi',
    colorHex: '#A855F7',
    bgTintHex: 'rgba(168, 85, 247, 0.14)',
    borderHex: 'rgba(168, 85, 247, 0.55)',
    textHex: '#C084FC',
    enPrefix: 'Audio Foley & Tempo Rhythm',
  },
];

export function normalizeSceneNoteCategory(
  category: SceneNoteCategory
): CanonicalSceneNoteCategory {
  if (category === 'kamera' || category === 'dogrulama_karti') return 'kamera';
  if (category === 'isik' || category === 'isik_flas') return 'isik';
  if (category === 'hareket' || category === 'karakter') return 'hareket';
  if (category === 'ses' || category === 'gecis_ritim') return 'ses';
  return 'kamera';
}

export function getSceneNoteCategoryMeta(
  category: SceneNoteCategory
): SceneNoteCategoryMeta {
  const canonical = normalizeSceneNoteCategory(category);
  return (
    SCENE_NOTE_CATEGORIES.find((c) => c.id === canonical) || SCENE_NOTE_CATEGORIES[0]
  );
}

export const SCENE_AUDIO_SFX_PRESETS: {
  id: 'auto' | SceneAudioSfxSynthType;
  shortLabelTr: string;
  sfxTitleTr: string;
  defaultBpm: number;
  synthType: SceneAudioSfxSynthType;
}[] = [
  {
    id: 'auto',
    shortLabelTr: 'Otomatik (Not Bazlı)',
    sfxTitleTr: 'Not Açıklamasına Göre Dinamik Foley & Tempo',
    defaultBpm: 96,
    synthType: 'warm-pulse',
  },
  {
    id: 'focus-click',
    shortLabelTr: 'Kağıt & AF Klik (78 BPM)',
    sfxTitleTr: 'Hafif Dokulu Kağıt Hışırtısı & 28mm AF Odak Klik Sesi',
    defaultBpm: 78,
    synthType: 'focus-click',
  },
  {
    id: 'warm-pulse',
    shortLabelTr: 'Handheld & Bas (98 BPM)',
    sfxTitleTr: 'Organik El Çekimi (Handheld) Mikro-Salınım & Optik Bas',
    defaultBpm: 98,
    synthType: 'warm-pulse',
  },
  {
    id: 'flash-transient',
    shortLabelTr: 'Flaş & Lo-Fi (92 BPM)',
    sfxTitleTr: '15° Kapasitör Flaş Tınısı + Sıcak Analog Oda Rezonansı',
    defaultBpm: 92,
    synthType: 'flash-transient',
  },
  {
    id: 'heel-whoosh',
    shortLabelTr: 'Topuklu & Whoosh (122 BPM)',
    sfxTitleTr: 'Ritmik Topuk Pivot Sesi + Kumaş Savrulma Foley & Whoosh',
    defaultBpm: 122,
    synthType: 'heel-whoosh',
  },
];

export const SCENE_NOTE_QUICK_TEMPLATES: SceneNoteQuickTemplate[] = [
  {
    id: 'tpl-card-lock',
    labelTr: '+ [Kamera] 3 Satır Kağıt Netleme',
    defaultTitleTr: 'Kamera Odak Kilidi & 3 Satırlı Doğrulama Kağıdı',
    category: 'kamera',
    cameraNoteTr: '28mm iPhone · Makro Odak Kilidi',
    descriptionTr:
      'Karakter 3 satırlı el yazısı doğrulama kağıdını göğüs hizasında sabit tutar; parmaklar metni kapatmaz ve telefon kamerası el yazısı mürekkep dokusunu netler.',
    directiveEn:
      'Subject holds the 3-line handwritten verification paper steady at chest height with fingers strictly on the outer margins; smartphone autofocus locks razor-sharp onto the 3 handwritten lines.',
  },
  {
    id: 'tpl-handheld-sway',
    labelTr: '+ [Kamera] Organik El Çekimi',
    defaultTitleTr: 'Amatör Reels El Çekimi Mikro Salınım',
    category: 'kamera',
    cameraNoteTr: 'Elde Çekim (Handheld) · Doğal Sallantı',
    descriptionTr:
      'Çekimi yapan kişinin elinde çok hafif organik bir nefes salınımı hissedilir; dikey 9:16 TikTok/Reels ev çekimi gerçekçiliği maksimuma çıkar.',
    directiveEn:
      'Subtle organic handheld camera breathing and micro-sway from the person filming, reinforcing authentic vertical 9:16 social media realism.',
  },
  {
    id: 'tpl-flash-pore',
    labelTr: '+ [Işık] Telefon Flaşı & Gözenek',
    defaultTitleTr: 'Doğrudan Telefon Flaşı & Fujifilm 400 Doku',
    category: 'isik',
    cameraNoteTr: '15° Açılı LED Flaş · ISO 400 Gren',
    descriptionTr:
      'Doğrudan telefon flaşı elmacık kemiklerinde hafif doğal speküler parlama oluşturur; porselen filtre olmadan gerçek cilt gözenekleri ve Fujifilm 400 greni vurgulanır.',
    directiveEn:
      'Direct smartphone LED flash creates authentic specular highlights on cheekbones and collarbones, emphasizing real micro-pores and organic Fujifilm 400 film grain.',
  },
  {
    id: 'tpl-heel-turn',
    labelTr: '+ [Hareket] Topuklu Dönüş & Kumaş',
    defaultTitleTr: 'Topuklu Pivot Dönüş & Kumaş Akışı',
    category: 'hareket',
    cameraNoteTr: 'Tam Boy 9:16 · 0.15x Gimbal Takip',
    descriptionTr:
      'Karakter yüksek topuklular üzerinde dengeli bir dönüş başlatır; kıyafet kumaşı ve saç uçları hareketin ivmesiyle doğal fizik kurallarına uygun salınır.',
    directiveEn:
      'Subject initiates a poised pivot turn in high heels; fabric drape and hair strands follow authentic inertia and secondary motion physics without morphing.',
  },
  {
    id: 'tpl-natural-smile',
    labelTr: '+ [Hareket] Doğal Gülümseme & Mimik',
    defaultTitleTr: 'Samimi Göz Teması & Doğal Mimik',
    category: 'hareket',
    cameraNoteTr: 'Göz Hizası · 0.1x Mikro Yaklaşma',
    descriptionTr:
      'Karakter kameraya samimi ve doğal bir ifadeyle gülümser; gerçekçi göz kırpma, hafif nefes alışverişi ve gözenekli doğal cilt dokusu net biçimde korunur.',
    directiveEn:
      'Subject maintains warm direct eye contact with a subtle authentic smile, natural micro-blinking, and gentle breathing while preserving visible skin pores without plastic smoothing.',
  },
  {
    id: 'tpl-final-pose',
    labelTr: '+ [Ses] Foley Ritim & Final Kapanış',
    defaultTitleTr: 'Akustik Foley Ritmi & Net Doğrulama Kapanışı',
    category: 'ses',
    cameraNoteTr: 'Sabitlenen Kadraj · Akustik L-Cut Kapanış',
    descriptionTr:
      'Topuk sesi ve kumaş hışırtısı yumuşakça sönümlenirken oda ambiyansı netleşir; karakter son karede 3 satırlı doğrulama kağıdıyla kameraya sabit bakar.',
    directiveEn:
      'Footstep foley and fabric rustle settle smoothly into intimate room ambiance as subject locks final eye contact with 100% legible 3-line verification paper.',
  },
];

export function buildPromptDirectiveFromSceneNote(
  note: {
    startSec: number;
    endSec: number;
    titleTr: string;
    category: SceneNoteCategory;
    cameraNoteTr?: string;
    descriptionTr: string;
    customDirectiveEn?: string;
  },
  fps: VideoFpsOption = 24
): string {
  const catMeta = getSceneNoteCategoryMeta(note.category);
  const startFrame = Math.round(note.startSec * fps);
  const endFrame = Math.round(note.endSec * fps);

  if (note.customDirectiveEn && note.customDirectiveEn.trim().length > 0) {
    return `[Trim ${note.startSec.toFixed(1)}s–${note.endSec.toFixed(1)}s | Frames ${startFrame}–${endFrame} | ${catMeta.enPrefix}]: ${note.customDirectiveEn.trim()}`;
  }

  // Synthesize English directive from Turkish description + category context
  const lower = note.descriptionTr.toLowerCase();
  const extraClauses: string[] = [];

  if (lower.includes('kağıt') || lower.includes('kart') || lower.includes('satır') || lower.includes('doğrulama')) {
    extraClauses.push(
      'subject holds the 3-line handwritten verification paper clearly in frame with unobstructed ink legibility'
    );
  }
  if (lower.includes('gülümse') || lower.includes('göz') || lower.includes('bakış') || lower.includes('mimik')) {
    extraClauses.push(
      'warm authentic eye contact, natural micro-expressions, and realistic blinking'
    );
  }
  if (lower.includes('dönüş') || lower.includes('360') || lower.includes('180') || lower.includes('topuklu')) {
    extraClauses.push(
      'poised pivot movement in high heels with realistic hair and fabric inertia'
    );
  }
  if (lower.includes('flaş') || lower.includes('gözenek') || lower.includes('cilt') || lower.includes('ışık')) {
    extraClauses.push(
      'direct smartphone flash highlights natural skin pores and Fujifilm 400 grain without plastic smoothing'
    );
  }
  if (lower.includes('titreme') || lower.includes('handheld') || lower.includes('kamera') || lower.includes('yaklaş')) {
    extraClauses.push(
      'organic handheld smartphone camera trajectory with smooth optical focus tracking'
    );
  }
  if (lower.includes('ses') || lower.includes('foley') || lower.includes('tempo') || lower.includes('bpm') || lower.includes('hışırtı')) {
    extraClauses.push(
      'synchronized acoustic foley cues and rhythmic tempo pacing'
    );
  }

  const synthesizedEn =
    extraClauses.length > 0
      ? extraClauses.join(', ')
      : 'authentic 9:16 vertical smartphone choreography maintaining locked facial identity and natural skin texture';

  return `[Trim ${note.startSec.toFixed(1)}s–${note.endSec.toFixed(1)}s | Frames ${startFrame}–${endFrame} | ${catMeta.enPrefix} — "${note.titleTr}"]: ${synthesizedEn} (Editor Note: ${note.descriptionTr.trim()})`;
}

export function getDefaultTimelineSceneNotes(params: {
  turnAngle: 'soft' | '180' | '360';
  durationSec?: number;
  fps?: VideoFpsOption;
  verificationHeader?: string;
  verificationDate?: string;
  verificationWebsite?: string;
}): TimelineSceneNote[] {
  const {
    turnAngle,
    durationSec = 8.0,
    fps = 24,
    verificationHeader = 'VERIFIED',
    verificationDate = '04.10.2026',
    verificationWebsite = 'vespera.studio',
  } = params;

  const safeDur = Math.max(4.0, Number((durationSec || 8.0).toFixed(1)));
  const t1End = Number((safeDur * 0.25).toFixed(1));
  const t2End = Number((safeDur * 0.55).toFixed(1));
  const t3End = Number((safeDur * 0.80).toFixed(1));

  const cardTextSummary = `"${verificationHeader} / ${verificationDate} / ${verificationWebsite}"`;

  const note1DescTr = `Kamera & Odak: 28mm iPhone lensi tam boy 9:16 dikey kadrajda karakterin yüzüne ve göğüs hizasında tuttuğu 3 satırlı ${cardTextSummary} doğrulama kağıdına net odak kilidi yapar.`;
  const note1DirEn = `Opening camera lock: 28mm smartphone lens establishes full head-to-heels 9:16 vertical framing with crisp autofocus lock on the 3-line handwritten verification paper (${cardTextSummary}).`;

  const note2DescTr =
    turnAngle === '360'
      ? 'Hareket & Koreografi: Karakter yüksek topuklular üzerinde 360° tam dönüş yaparken kıyafet kumaşı ve saç uçları doğal ivmeyle salınır; dönüş sonunda doğrulama kağıdı tekrar lense döner.'
      : turnAngle === '180'
      ? 'Hareket & Koreografi: Karakter 180° yarım dönüşle omuz üstünden kameraya gülümser ve akıcı biçimde tekrar öne dönerek 3 satırlı doğrulama kağıdını gösterir.'
      : 'Hareket & Koreografi: Karakter doğal bir nefes alışverişiyle samimi biçimde gülümser, hafif baş eğimi verir ve 3 satırlı doğrulama kağıdını sarsıntısız tutar.';

  const note2DirEn =
    turnAngle === '360'
      ? 'Core motion choreography: Subject executes a poised 360-degree full spin in high heels with realistic hair and fabric physics, returning the 3-line verification paper clearly to the lens.'
      : turnAngle === '180'
      ? 'Core motion choreography: Subject performs a fluid 180-degree half-turn with an over-the-shoulder glance before returning forward with the 3-line verification paper.'
      : 'Core motion choreography: Subject offers a genuine warm smile, subtle head tilt, and steady chest-level hold of the 3-line verification paper.';

  const note3DescTr =
    'Işık & Doku: 15° açılı doğrudan telefon flaşı elmacık kemiklerinde doğal speküler parlama oluşturur; porselen filtre olmadan gerçek cilt gözenekleri ve Fujifilm 400 film greni netleşir.';
  const note3DirEn =
    'Flash & skin texture: Direct 15-degree smartphone LED flash creates authentic specular highlights on cheekbones, preserving real skin pores and organic Fujifilm 400 film grain without plastic smoothing.';

  const note4DescTr =
    'Ses & Final Kapanış: Topuk adım foley tınısı ve hafif kağıt hışırtısı sıcak oda ambiyansıyla dengelenir; son karede 3 satırlı el yazısı metin %100 okunaklı biçimde sabitlenir.';
  const note4DirEn =
    'Audio rhythm & final lock-off: Subtle high-heel foley and textured paper rustle settle into warm room tone as motion locks cleanly with 100% legible 3-line handwritten text until the final frame.';

  return [
    {
      id: 'scene-note-1',
      sceneOrder: 1,
      titleTr: 'Sahne 01 · Kamera Odak Kilidi & 3 Satır Kağıt',
      startSec: 0.0,
      endSec: t1End,
      category: 'kamera',
      categoryLabelTr: 'Kamera',
      colorHex: '#3B82F6',
      cameraNoteTr: '28mm iPhone · AF Odak Kilidi',
      descriptionTr: note1DescTr,
      selectedSfxPresetId: 'focus-click',
      promptDirectiveEn: buildPromptDirectiveFromSceneNote(
        {
          startSec: 0.0,
          endSec: t1End,
          titleTr: 'Sahne 01 · Kamera Odak Kilidi & 3 Satır Kağıt',
          category: 'kamera',
          descriptionTr: note1DescTr,
          customDirectiveEn: note1DirEn,
        },
        fps
      ),
    },
    {
      id: 'scene-note-2',
      sceneOrder: 2,
      titleTr:
        turnAngle === '360'
          ? 'Sahne 02 · 360° Tam Dönüş & Kumaş Hareketi'
          : turnAngle === '180'
          ? 'Sahne 02 · 180° Yarım Dönüş & Bakış Hareketi'
          : 'Sahne 02 · Doğal Mimik & Mikro Poz Hareketi',
      startSec: t1End,
      endSec: t2End,
      category: 'hareket',
      categoryLabelTr: 'Hareket',
      colorHex: '#10B981',
      cameraNoteTr:
        turnAngle === '360'
          ? '0.15x Yay Takibi · 360°'
          : turnAngle === '180'
          ? '0.15x Yanal Takip · 180°'
          : '0.1x Optik Push-In · 0°',
      descriptionTr: note2DescTr,
      selectedSfxPresetId: 'heel-whoosh',
      promptDirectiveEn: buildPromptDirectiveFromSceneNote(
        {
          startSec: t1End,
          endSec: t2End,
          titleTr:
            turnAngle === '360'
              ? 'Sahne 02 · 360° Tam Dönüş & Kumaş Hareketi'
              : turnAngle === '180'
              ? 'Sahne 02 · 180° Yarım Dönüş & Bakış Hareketi'
              : 'Sahne 02 · Doğal Mimik & Mikro Poz Hareketi',
          category: 'hareket',
          descriptionTr: note2DescTr,
          customDirectiveEn: note2DirEn,
        },
        fps
      ),
    },
    {
      id: 'scene-note-3',
      sceneOrder: 3,
      titleTr: 'Sahne 03 · 15° Telefon Flaşı & Gözenek Işığı',
      startSec: t2End,
      endSec: t3End,
      category: 'isik',
      categoryLabelTr: 'Işık',
      colorHex: '#F59E0B',
      cameraNoteTr: '15° LED Flaş · Fujifilm 400 Gren',
      descriptionTr: note3DescTr,
      selectedSfxPresetId: 'flash-transient',
      promptDirectiveEn: buildPromptDirectiveFromSceneNote(
        {
          startSec: t2End,
          endSec: t3End,
          titleTr: 'Sahne 03 · 15° Telefon Flaşı & Gözenek Işığı',
          category: 'isik',
          descriptionTr: note3DescTr,
          customDirectiveEn: note3DirEn,
        },
        fps
      ),
    },
    {
      id: 'scene-note-4',
      sceneOrder: 4,
      titleTr: 'Sahne 04 · Akustik Foley, Tempo & Final Kapanış',
      startSec: t3End,
      endSec: safeDur,
      category: 'ses',
      categoryLabelTr: 'Ses',
      colorHex: '#A855F7',
      cameraNoteTr: 'Sabit Kadraj · L-Cut Akustik Bitiş',
      descriptionTr: note4DescTr,
      selectedSfxPresetId: 'warm-pulse',
      promptDirectiveEn: buildPromptDirectiveFromSceneNote(
        {
          startSec: t3End,
          endSec: safeDur,
          titleTr: 'Sahne 04 · Akustik Foley, Tempo & Final Kapanış',
          category: 'ses',
          descriptionTr: note4DescTr,
          customDirectiveEn: note4DirEn,
        },
        fps
      ),
    },
  ];
}

export function deriveSceneAudioTempoRecommendation(params: {
  descriptionTr: string;
  cameraNoteTr?: string;
  titleTr?: string;
  category: SceneNoteCategory;
  startSec: number;
  endSec: number;
  turnAngle?: 'soft' | '180' | '360';
  videoSpeed?: VideoSpeedOption;
  motionIntensity?: number;
  overrideSfxPresetId?: 'auto' | SceneAudioSfxSynthType;
  overrideTempoBpm?: number;
}): SceneAudioTempoRecommendation {
  const {
    descriptionTr,
    cameraNoteTr = '',
    titleTr = '',
    category,
    startSec,
    endSec,
    turnAngle = 'soft',
    videoSpeed = 1,
    motionIntensity = 3,
    overrideSfxPresetId = 'auto',
    overrideTempoBpm,
  } = params;

  const canonicalCat = normalizeSceneNoteCategory(category);
  const combinedText = `${titleTr} ${cameraNoteTr} ${descriptionTr}`.toLowerCase();
  const clipDur = Math.max(0.5, endSec - startSec);

  // Base intensity from canonical category
  let score =
    canonicalCat === 'ses'
      ? 66
      : canonicalCat === 'hareket'
      ? 60
      : canonicalCat === 'kamera'
      ? 48
      : 46; // isik

  // Turn angle & speed contribution
  if (turnAngle === '360') score += 14;
  else if (turnAngle === '180') score += 8;

  if (videoSpeed === 2) score += 12;
  else if (videoSpeed === 0.5) score -= 10;

  score += (motionIntensity - 3) * 3;

  // Keyword analysis on note description
  const has360OrFullSpin =
    combinedText.includes('360') ||
    combinedText.includes('tam dönüş') ||
    combinedText.includes('savrul') ||
    combinedText.includes('hızlı');
  const has180OrTurn =
    combinedText.includes('180') ||
    combinedText.includes('dönüş') ||
    combinedText.includes('topuklu') ||
    combinedText.includes('pivot') ||
    combinedText.includes('kumaş');
  const hasHandheldOrMove =
    combinedText.includes('handheld') ||
    combinedText.includes('titreme') ||
    combinedText.includes('salınım') ||
    combinedText.includes('yaklaş') ||
    combinedText.includes('push-in') ||
    combinedText.includes('takip');
  const hasFlashOrPore =
    combinedText.includes('flaş') ||
    combinedText.includes('gözenek') ||
    combinedText.includes('fujifilm') ||
    combinedText.includes('speküler') ||
    combinedText.includes('ışık');
  const hasCardOrSteady =
    combinedText.includes('kağıt') ||
    combinedText.includes('doğrulama') ||
    combinedText.includes('3 satır') ||
    combinedText.includes('sabit') ||
    combinedText.includes('netle') ||
    combinedText.includes('odak');

  if (has360OrFullSpin) score += 18;
  else if (has180OrTurn) score += 12;
  if (hasHandheldOrMove) score += 8;
  if (hasFlashOrPore) score += 5;
  if (hasCardOrSteady && !has360OrFullSpin && !has180OrTurn) score -= 9;

  if (overrideSfxPresetId === 'heel-whoosh') score += 12;
  else if (overrideSfxPresetId === 'focus-click') score -= 6;
  else if (overrideSfxPresetId === 'flash-transient') score += 4;

  // Short trim window with high motion increases action density
  if (clipDur < 1.8 && (has360OrFullSpin || has180OrTurn || canonicalCat === 'ses')) {
    score += 10;
  } else if (clipDur > 4.0 && hasCardOrSteady) {
    score -= 5;
  }

  const intensityPct = Math.max(22, Math.min(96, Math.round(score)));

  let level: ActionIntensityLevel = 'dusuk';
  let levelLabelTr = 'Düşük Yoğunluk · Sabit Odak';
  let colorHex = '#10B981';

  if (intensityPct >= 83) {
    level = 'kritik';
    levelLabelTr = 'Kritik Yoğunluk · Keskin Geçiş Vurgusu';
    colorHex = '#EF4444';
  } else if (intensityPct >= 65) {
    level = 'yuksek';
    levelLabelTr = 'Yüksek Yoğunluk · Dinamik Hareket';
    colorHex = '#F97316';
  } else if (intensityPct >= 42) {
    level = 'dengeli';
    levelLabelTr = 'Dengeli Yoğunluk · Akıcı Geçiş';
    colorHex = '#F59E0B';
  }

  // Determine synthType & SFX metadata (either from explicit preset override or semantic analysis)
  let sfxTitleTr = 'Hafif Dokulu Kağıt Hışırtısı & 28mm AF Odak Klik Sesi';
  let sfxDetailTr =
    '3 satırlı doğrulama kağıdı sabit tutulurken mikro-akustik kağıt dokusu ve iPhone lens netleme tınısı (-20 LUFS doğal oda ambiyansı).';
  let tempoBpm = 78;
  let tempoLabelTr = '78 BPM · Sakin & Odaklı (Adagio)';
  let rhythmCueTr = `Girişte (${startSec.toFixed(1)}sn) sarsıntısız kesme · Kağıt netleme karesinde mikro-vurgu`;
  let promptAudioCueEn =
    'Audio & Tempo Cue (78 BPM Adagio): Crisp micro-foley of textured verification paper rustle and subtle 28mm smartphone autofocus lock in quiet room tone.';
  let synthType: SceneAudioSfxSynthType = 'focus-click';

  const effectiveMode: SceneAudioSfxSynthType =
    overrideSfxPresetId !== 'auto'
      ? overrideSfxPresetId
      : has360OrFullSpin || (has180OrTurn && intensityPct >= 62) || canonicalCat === 'hareket'
      ? 'heel-whoosh'
      : hasFlashOrPore || canonicalCat === 'isik'
      ? 'flash-transient'
      : hasHandheldOrMove || canonicalCat === 'ses'
      ? 'warm-pulse'
      : 'focus-click';

  if (effectiveMode === 'heel-whoosh') {
    sfxTitleTr = 'Ritmik Topuk Pivot Sesi + Kumaş Savrulma Foley & Yumuşak Whoosh';
    sfxDetailTr =
      'Yüksek topuklu dönüş ivmesiyle senkronize parke/mermer adım tınısı, ipek/saten kumaş hışırtısı ve dönüş ortasında organik hava geçişi (Whoosh).';
    tempoBpm = Math.min(136, Math.max(110, Math.round(92 + intensityPct * 0.36)));
    synthType = 'heel-whoosh';
  } else if (effectiveMode === 'flash-transient') {
    sfxTitleTr = 'Kısa Kapasitör Flaş Tınısı + Sıcak Analog Oda Rezonansı';
    sfxDetailTr =
      'Doğrudan telefon flaşı ve Fujifilm 400 gren dokusunu destekleyen 15° LED deşarj tınısı, yumuşak nefes alışverişi ve sıcak akustik oda katmanı.';
    tempoBpm = Math.min(112, Math.max(84, Math.round(74 + intensityPct * 0.3)));
    synthType = 'flash-transient';
  } else if (effectiveMode === 'warm-pulse') {
    sfxTitleTr = 'Organik El Çekimi (Handheld) Mikro-Salınım & Akustik Geçiş Bası';
    sfxDetailTr =
      'Kamerayı tutan kişinin doğal hareket dokusu, hafif optik yaklaşma (push-in) bas frekansı ve sahne geçişini yumuşatan L-Cut akustik rampa.';
    tempoBpm = Math.min(124, Math.max(90, Math.round(80 + intensityPct * 0.34)));
    synthType = 'warm-pulse';
  } else {
    sfxTitleTr = 'Hafif Dokulu Kağıt Hışırtısı & 28mm AF Odak Klik Sesi';
    sfxDetailTr =
      '3 satırlı doğrulama kağıdı sabit tutulurken mikro-akustik kağıt dokusu ve iPhone lens netleme tınısı (-20 LUFS doğal oda ambiyansı).';
    tempoBpm = Math.min(96, Math.max(72, Math.round(68 + intensityPct * 0.25)));
    synthType = 'focus-click';
  }

  if (typeof overrideTempoBpm === 'number' && !Number.isNaN(overrideTempoBpm)) {
    tempoBpm = Math.max(60, Math.min(160, Math.round(overrideTempoBpm)));
  }

  const paceName =
    tempoBpm >= 116
      ? 'Dinamik Reels Pivot Temposu (Allegretto)'
      : tempoBpm >= 96
      ? 'Akıcı Sosyal Medya Kurgu Temposu (Moderato)'
      : tempoBpm >= 84
      ? 'Lo-Fi Analog Ritim (Andante)'
      : 'Net Doğrulama & Odak Kilidi (Adagio)';

  tempoLabelTr = `${tempoBpm} BPM · ${paceName}`;

  if (synthType === 'heel-whoosh') {
    rhythmCueTr = `${startSec.toFixed(1)}sn–${endSec.toFixed(1)}sn aralığında dönüş tepe noktasında (${((startSec + endSec) / 2).toFixed(1)}sn) güçlü ritim vuruşu (Beat-Drop)`;
    promptAudioCueEn = `Audio & Tempo Cue (${tempoBpm} BPM Dynamic Pace): Poised high-heel pivot footstep foley, organic fabric swoosh inertia, and subtle rotational air movement synced to peak turn.`;
  } else if (synthType === 'flash-transient') {
    rhythmCueTr = `${startSec.toFixed(1)}sn flaş parlamasında J-Cut ses girişi · ${endSec.toFixed(1)}sn sabitlenen bakışta yumuşak sönümlenme`;
    promptAudioCueEn = `Audio & Tempo Cue (${tempoBpm} BPM Lo-Fi Analog): Subtle smartphone flash capacitor transient paired with warm intimate room ambiance and natural breathing.`;
  } else if (synthType === 'warm-pulse') {
    rhythmCueTr = `${startSec.toFixed(1)}sn girişinde 0.3sn L-Cut ses köprüsü · Kamera yaklaşma ivmesiyle yükselen tempo`;
    promptAudioCueEn = `Audio & Tempo Cue (${tempoBpm} BPM Moderato Flow): Authentic handheld smartphone micro-movement foley with smooth low-end optical push-in transition ramp.`;
  } else {
    rhythmCueTr = `${startSec.toFixed(1)}sn–${endSec.toFixed(1)}sn boyunca sabit metronom · 3 satırlı kağıt okunurluğu için temiz oda akustiği`;
    promptAudioCueEn = `Audio & Tempo Cue (${tempoBpm} BPM Adagio): Crisp micro-foley of textured verification paper rustle and subtle 28mm smartphone autofocus lock in quiet room tone.`;
  }

  // Generate 28-bar visual 'Audio Soundwave Timeline' (Ses Dalgası Zaman Çizelgesi) across [startSec, endSec]
  const barCount = 28;
  const beatIntervalSec = Number((60 / Math.max(60, tempoBpm)).toFixed(2));
  const beatCountInClip = Math.max(1, Math.round(clipDur / beatIntervalSec));
  const catMeta = getSceneNoteCategoryMeta(category);

  let maxAmp = 0;
  let sumAmp = 0;

  const soundwaveBars: SceneAudioWaveformBar[] = Array.from({ length: barCount }, (_, idx) => {
    const ratio = idx / Math.max(1, barCount - 1);
    const barTimeSec = Number((startSec + ratio * clipDur).toFixed(2));
    const localElapsed = barTimeSec - startSec;

    // Beat proximity calculation from BPM
    const nearestBeatMultiple = Math.round(localElapsed / beatIntervalSec) * beatIntervalSec;
    const distToBeat = Math.abs(localElapsed - nearestBeatMultiple);
    const beatStepWindow = Math.max(0.04, clipDur / barCount);
    const isBeatMarker = distToBeat <= beatStepWindow * 0.85 && idx > 0 && idx < barCount - 1;
    const beatPulse = Math.max(0, 1 - distToBeat / (beatIntervalSec * 0.45));

    // Shape acoustic envelope based on synthType + intensityPct
    const baseLevel = (intensityPct / 100) * 0.58;
    let envelope = baseLevel;
    let isTransientPeak = false;
    let phaseLabelTr = 'Akustik Gövde';

    if (synthType === 'heel-whoosh') {
      // Mid-clip rotational whoosh swell + crisp heel step transients on beats
      const midBell = Math.exp(-Math.pow((ratio - 0.52) / 0.24, 2));
      const stepTransient = isBeatMarker ? 0.28 : beatPulse * 0.16;
      envelope = 0.24 + baseLevel * 0.52 + midBell * 0.36 + stepTransient;
      if (Math.abs(ratio - 0.52) < 0.08 || (isBeatMarker && ratio > 0.25 && ratio < 0.8)) {
        isTransientPeak = true;
        phaseLabelTr = 'Topuk Pivot & Kumaş Whoosh Vurgusu';
      } else if (isBeatMarker) {
        phaseLabelTr = `${tempoBpm} BPM Adım Ritim Vuruşu`;
      }
    } else if (synthType === 'flash-transient') {
      // Sharp capacitor flash transient at ~28% of clip + warm analog decay tail
      const flashSpike = Math.exp(-Math.pow((ratio - 0.28) / 0.09, 2));
      const warmTail = Math.sin(ratio * Math.PI) * 0.22 + beatPulse * 0.14;
      envelope = 0.22 + baseLevel * 0.45 + flashSpike * 0.46 + warmTail;
      if (Math.abs(ratio - 0.28) < 0.07) {
        isTransientPeak = true;
        phaseLabelTr = '15° Telefon Flaşı Akustik Transiyenti';
      } else if (isBeatMarker) {
        phaseLabelTr = 'Analog Lo-Fi Tempo Vuruşu';
      }
    } else if (synthType === 'focus-click') {
      // Double AF lock click near 18% and 32% + subtle paper rustle texture
      const afClick1 = Math.exp(-Math.pow((ratio - 0.18) / 0.06, 2)) * 0.38;
      const afClick2 = Math.exp(-Math.pow((ratio - 0.32) / 0.06, 2)) * 0.32;
      const paperRustle = Math.abs(Math.sin(idx * 1.9 + startSec * 3)) * 0.14 + beatPulse * 0.1;
      envelope = 0.18 + baseLevel * 0.42 + afClick1 + afClick2 + paperRustle;
      if (Math.abs(ratio - 0.18) < 0.05 || Math.abs(ratio - 0.32) < 0.05) {
        isTransientPeak = true;
        phaseLabelTr = '28mm AF Odak Klik & Kağıt Dokusu';
      } else if (isBeatMarker) {
        phaseLabelTr = 'Metronom Odak Darbesi';
      }
    } else {
      // 'warm-pulse': smooth low-end optical push-in wave + L-cut entry/exit ramp
      const pushWave = Math.sin(ratio * Math.PI) * 0.32;
      const microTexture = Math.cos(idx * 1.35) * 0.08 + beatPulse * 0.18;
      envelope = 0.22 + baseLevel * 0.48 + pushWave + microTexture;
      if (isBeatMarker && ratio > 0.3 && ratio < 0.75) {
        isTransientPeak = true;
        phaseLabelTr = 'Optik Push-In Bas & Tempo Vurgusu';
      } else if (isBeatMarker) {
        phaseLabelTr = `${tempoBpm} BPM Ritim Darbesi`;
      }
    }

    const amplitude = Number(Math.max(0.16, Math.min(0.98, envelope)).toFixed(2));
    if (amplitude > maxAmp) maxAmp = amplitude;
    sumAmp += amplitude;

    // Map amplitude (0.16..0.98) to studio dBFS (-26.0 .. -1.2 dBFS)
    const dbFs = Number((-28 + amplitude * 27.2).toFixed(1));

    const barColorHex = isTransientPeak
      ? colorHex
      : isBeatMarker
      ? catMeta.colorHex
      : amplitude >= 0.72
      ? colorHex
      : catMeta.colorHex;

    return {
      index: idx,
      timeSec: barTimeSec,
      relativePct: Math.round(ratio * 100),
      amplitude,
      dbFs,
      isBeatMarker,
      isTransientPeak,
      phaseLabelTr,
      barColorHex,
    };
  });

  const peakDbFs = Number((-28 + maxAmp * 27.2).toFixed(1));
  const avgAmp = sumAmp / barCount;
  const avgLufs = Number((-26 + avgAmp * 16.5).toFixed(1));

  return {
    intensityPct,
    level,
    levelLabelTr,
    colorHex,
    sfxTitleTr,
    sfxDetailTr,
    tempoBpm,
    tempoLabelTr,
    rhythmCueTr,
    promptAudioCueEn,
    synthType,
    peakDbFs,
    avgLufs,
    beatIntervalSec,
    beatCountInClip,
    soundwaveBars,
  };
}

export function calculateSceneTransitionIntensityProfile(params: {
  waveformBars: WaveformTimelineBar[];
  durationSec: number;
  trimStart: number;
  trimEnd: number;
  turnAngle: 'soft' | '180' | '360';
  videoSpeed: VideoSpeedOption;
  motionIntensity: number;
  noteCategory: SceneNoteCategory;
  noteTitleTr: string;
  noteCameraTr: string;
  noteDescriptionTr: string;
  sceneNotes: TimelineSceneNote[];
  overrideSfxPresetId?: 'auto' | SceneAudioSfxSynthType;
  overrideTempoBpm?: number;
}): SceneTransitionIntensityProfile {
  const {
    waveformBars,
    durationSec,
    trimStart,
    trimEnd,
    turnAngle,
    videoSpeed,
    motionIntensity,
    noteCategory,
    noteTitleTr,
    noteCameraTr,
    noteDescriptionTr,
    sceneNotes,
    overrideSfxPresetId = 'auto',
    overrideTempoBpm,
  } = params;

  const safeStart = Math.max(0, Math.min(trimStart, durationSec - 0.5));
  const safeEnd = Math.min(durationSec, Math.max(safeStart + 0.5, trimEnd));
  const clipDurationSec = Number((safeEnd - safeStart).toFixed(1));

  const audioTempo = deriveSceneAudioTempoRecommendation({
    descriptionTr: noteDescriptionTr,
    cameraNoteTr: noteCameraTr,
    titleTr: noteTitleTr,
    category: noteCategory,
    startSec: safeStart,
    endSec: safeEnd,
    turnAngle,
    videoSpeed,
    motionIntensity,
    overrideSfxPresetId,
    overrideTempoBpm,
  });

  // Check if IN or OUT boundary coincides with another scene boundary for transition spike modeling
  const sorted = [...sceneNotes].sort((a, b) => a.startSec - b.startSec);
  const hasAdjacentAtStart = sorted.some(
    (n) => Math.abs(n.endSec - safeStart) < 0.35 || Math.abs(n.startSec - safeStart) < 0.35
  );
  const hasAdjacentAtEnd = sorted.some(
    (n) => Math.abs(n.startSec - safeEnd) < 0.35 || Math.abs(n.endSec - safeEnd) < 0.35
  );

  // Ramp window at IN and OUT boundaries (seconds)
  const rampWindowSec = Math.min(0.75, Math.max(0.32, clipDurationSec * 0.24));
  const baseNormalized = audioTempo.intensityPct / 100;

  let peakTimeSec = safeStart;
  let peakIntensityVal = 0;
  const entryValues: number[] = [];
  const coreValues: number[] = [];
  const exitValues: number[] = [];

  const bars: WaveformActionIntensityBar[] = waveformBars.map((bar) => {
    const isInsideSelectedRange =
      bar.timeSec >= safeStart - 0.06 && bar.timeSec <= safeEnd + 0.06;
    const distFromStart = Math.abs(bar.timeSec - safeStart);
    const distFromEnd = Math.abs(bar.timeSec - safeEnd);

    let boundaryZone: 'in-ramp' | 'core' | 'out-ramp' | 'outside' = 'outside';
    if (isInsideSelectedRange) {
      if (bar.timeSec - safeStart <= rampWindowSec) {
        boundaryZone = 'in-ramp';
      } else if (safeEnd - bar.timeSec <= rampWindowSec) {
        boundaryZone = 'out-ramp';
      } else {
        boundaryZone = 'core';
      }
    }

    const isTransitionBoundary =
      isInsideSelectedRange &&
      (boundaryZone === 'in-ramp' || boundaryZone === 'out-ramp');

    // Compute transition spike near trimStart and trimEnd
    const startProximity = Math.max(0, 1 - distFromStart / (rampWindowSec * 1.35));
    const endProximity = Math.max(0, 1 - distFromEnd / (rampWindowSec * 1.35));
    const compressionBoost = clipDurationSec < 2.2 ? 0.14 : clipDurationSec < 3.2 ? 0.07 : 0.0;

    const transitionSpike = Number(
      Math.min(
        0.98,
        Math.max(
          startProximity * (hasAdjacentAtStart ? 0.85 : 0.68),
          endProximity * (hasAdjacentAtEnd ? 0.88 : 0.72)
        ) + (isTransitionBoundary ? compressionBoost : 0)
      ).toFixed(2)
    );

    // Combine base waveform amplitude with the edited note's semantic intensity & transition spike
    const rawIntensity = isInsideSelectedRange
      ? bar.amplitude * 0.42 +
        baseNormalized * 0.44 +
        (isTransitionBoundary ? transitionSpike * 0.22 : 0.06)
      : bar.amplitude * 0.38;

    const actionIntensity = Number(
      Math.max(0.16, Math.min(0.98, rawIntensity)).toFixed(2)
    );

    if (isInsideSelectedRange) {
      if (actionIntensity > peakIntensityVal) {
        peakIntensityVal = actionIntensity;
        peakTimeSec = bar.timeSec;
      }
      if (boundaryZone === 'in-ramp') entryValues.push(actionIntensity);
      else if (boundaryZone === 'out-ramp') exitValues.push(actionIntensity);
      else coreValues.push(actionIntensity);
    }

    let level: ActionIntensityLevel = 'dusuk';
    let levelLabelTr = 'Düşük · Sabit Odak';
    let colorHex = '#10B981';

    if (actionIntensity >= 0.82) {
      level = 'kritik';
      levelLabelTr = 'Kritik · Keskin Geçiş Şiddeti';
      colorHex = '#EF4444';
    } else if (actionIntensity >= 0.65) {
      level = 'yuksek';
      levelLabelTr = 'Yüksek · Dinamik Hareket';
      colorHex = '#F97316';
    } else if (actionIntensity >= 0.43) {
      level = 'dengeli';
      levelLabelTr = 'Dengeli · Akıcı Geçiş';
      colorHex = '#F59E0B';
    }

    return {
      index: bar.index,
      timeSec: bar.timeSec,
      baseAmplitude: bar.amplitude,
      actionIntensity,
      transitionSpike,
      isInsideSelectedRange,
      isTransitionBoundary,
      boundaryZone,
      level,
      levelLabelTr,
      colorHex,
    };
  });

  const avg = (arr: number[], fallback: number) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : fallback;

  const entryTransitionSeverityPct = Math.round(
    Math.min(98, Math.max(20, avg(entryValues, baseNormalized) * 104))
  );
  const coreActionDensityPct = Math.round(
    Math.min(98, Math.max(20, avg(coreValues, baseNormalized) * 100))
  );
  const exitTransitionSeverityPct = Math.round(
    Math.min(98, Math.max(20, avg(exitValues, baseNormalized) * 105))
  );
  const overallIntensityPct = Math.round(
    entryTransitionSeverityPct * 0.28 +
      coreActionDensityPct * 0.44 +
      exitTransitionSeverityPct * 0.28
  );
  const peakIntensityPct = Math.max(
    overallIntensityPct,
    Math.round(peakIntensityVal * 100)
  );

  let dominantLevel: ActionIntensityLevel = 'dusuk';
  let dominantLevelLabelTr = 'Düşük Şiddet · Sabit & Yumuşak Geçiş';
  let dominantColorHex = '#10B981';

  if (overallIntensityPct >= 82 || peakIntensityPct >= 88) {
    dominantLevel = 'kritik';
    dominantLevelLabelTr = 'Kritik Geçiş Şiddeti · Yüksek İvme & Keskin Kesme';
    dominantColorHex = '#EF4444';
  } else if (overallIntensityPct >= 65) {
    dominantLevel = 'yuksek';
    dominantLevelLabelTr = 'Yüksek Aksiyon Yoğunluğu · Dinamik Dönüş Geçişi';
    dominantColorHex = '#F97316';
  } else if (overallIntensityPct >= 43) {
    dominantLevel = 'dengeli';
    dominantLevelLabelTr = 'Dengeli Geçiş Şiddeti · Organik Akış';
    dominantColorHex = '#F59E0B';
  }

  const transitionDiagnosticTr =
    dominantLevel === 'kritik'
      ? `Seçili ${safeStart.toFixed(1)}sn–${safeEnd.toFixed(1)}sn (${clipDurationSec}sn) aralığında sahne geçiş şiddeti yüksek (%${overallIntensityPct}). Yüz hatlarının ve 3 satırlı doğrulama kağıdının bulanıklaşmaması için giriş/çıkış karelerinde 0.3sn hız sönümleme (ease-in-out) önerilir.`
      : dominantLevel === 'yuksek'
      ? `Seçili ${safeStart.toFixed(1)}sn–${safeEnd.toFixed(1)}sn aralığında dinamik aksiyon katmanı aktif (%${overallIntensityPct}). Tepe hareket ${peakTimeSec.toFixed(1)}. saniyede gerçekleşir; kumaş ve saç fiziği korunurken çıkış karesinde odak sabitlenir.`
      : dominantLevel === 'dengeli'
      ? `Seçili ${safeStart.toFixed(1)}sn–${safeEnd.toFixed(1)}sn aralığında sahne geçiş şiddeti ideal dengede (%${overallIntensityPct}). Giriş (%${entryTransitionSeverityPct}) ve çıkış (%${exitTransitionSeverityPct}) geçişleri sarsıntısız akış sağlar.`
      : `Seçili ${safeStart.toFixed(1)}sn–${safeEnd.toFixed(1)}sn aralığında düşük geçiş şiddeti (%${overallIntensityPct}) ve maksimum optik sabitleme aktif; 3 satırlı el yazısı doğrulama kağıdı %100 keskinlikte kalır.`;

  const promptTransitionDirectiveEn = `Transition Envelope [${safeStart.toFixed(1)}s–${safeEnd.toFixed(1)}s | Action Density ${overallIntensityPct}% | Entry Ramp ${entryTransitionSeverityPct}% -> Peak ${peakIntensityPct}% at ${peakTimeSec.toFixed(1)}s -> Exit Ramp ${exitTransitionSeverityPct}%]: Smooth optical ease-in/ease-out damping across scene cut boundaries to prevent facial morphing.`;

  return {
    selectedStartSec: safeStart,
    selectedEndSec: safeEnd,
    clipDurationSec,
    overallIntensityPct,
    entryTransitionSeverityPct,
    coreActionDensityPct,
    exitTransitionSeverityPct,
    peakTimeSec,
    peakIntensityPct,
    dominantLevel,
    dominantLevelLabelTr,
    dominantColorHex,
    transitionDiagnosticTr,
    promptTransitionDirectiveEn,
    audioTempo,
    bars,
  };
}

export function reorderAndRecalculateSceneNotes(params: {
  notes: TimelineSceneNote[];
  fromIndex: number;
  toIndex: number;
  totalDurationSec: number;
  fps: VideoFpsOption;
}): TimelineSceneNote[] {
  const { notes, fromIndex, toIndex, totalDurationSec, fps } = params;
  const sorted = [...notes].sort((a, b) => a.startSec - b.startSec);
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= sorted.length ||
    toIndex >= sorted.length ||
    fromIndex === toIndex
  ) {
    return sorted;
  }

  const reordered = [...sorted];
  const [movedItem] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, movedItem);

  // Preserve each note's individual clip duration and pack them sequentially from 0.0s
  const safeTotal = Math.max(2.0, totalDurationSec || 8.0);
  const rawDurations = reordered.map((n) => Math.max(0.6, n.endSec - n.startSec));
  const sumRaw = rawDurations.reduce((acc, d) => acc + d, 0);
  const scaleFactor = sumRaw > 0 ? safeTotal / sumRaw : 1;

  let cursorSec = 0.0;
  return reordered.map((note, idx) => {
    const isLast = idx === reordered.length - 1;
    const scaledDur = Math.max(0.5, Number((rawDurations[idx] * scaleFactor).toFixed(1)));
    const newStart = Number(cursorSec.toFixed(1));
    const newEnd = isLast
      ? Number(safeTotal.toFixed(1))
      : Number(Math.min(safeTotal - 0.5 * (reordered.length - 1 - idx), newStart + scaledDur).toFixed(1));
    cursorSec = newEnd;

    // Clean any old "Sahne XX · " prefix in titleTr and re-number sequentially
    const strippedTitle = note.titleTr.replace(/^Sahne\s*\d+\s*·\s*/i, '').trim();
    const updatedTitle = `Sahne 0${idx + 1} · ${strippedTitle}`;

    const updatedDirectiveEn = buildPromptDirectiveFromSceneNote(
      {
        startSec: newStart,
        endSec: newEnd,
        titleTr: updatedTitle,
        category: note.category,
        cameraNoteTr: note.cameraNoteTr,
        descriptionTr: note.descriptionTr,
      },
      fps
    );

    return {
      ...note,
      sceneOrder: idx + 1,
      titleTr: updatedTitle,
      startSec: newStart,
      endSec: newEnd,
      promptDirectiveEn: updatedDirectiveEn,
    };
  });
}

export function applyTimelineSceneNotesToPromptEn(
  basePromptEn: string,
  notes: TimelineSceneNote[],
  fps: VideoFpsOption,
  trimStart: number,
  trimEnd: number
): string {
  if (!notes || notes.length === 0) return basePromptEn;

  const sorted = [...notes].sort((a, b) => a.startSec - b.startSec);
  const formattedNotes = sorted
    .map((n, idx) => {
      const sFrame = Math.round(n.startSec * fps);
      const eFrame = Math.round(n.endSec * fps);
      const audioRec = deriveSceneAudioTempoRecommendation({
        descriptionTr: n.descriptionTr,
        cameraNoteTr: n.cameraNoteTr,
        titleTr: n.titleTr,
        category: n.category,
        startSec: n.startSec,
        endSec: n.endSec,
      });
      return `Scene #${idx + 1} (${n.startSec.toFixed(1)}s–${n.endSec.toFixed(1)}s / Frames ${sFrame}–${eFrame} — ${n.categoryLabelTr} | Action Intensity ${audioRec.intensityPct}% | ${audioRec.tempoBpm} BPM): ${n.descriptionTr} [${audioRec.promptAudioCueEn}]`;
    })
    .join(' | ');

  const activeWindowNote = `Active Trim Window [${trimStart.toFixed(1)}s–${trimEnd.toFixed(1)}s] Timeline Scene Edit & Audio/Tempo Storyboard (${sorted.length} ordered segments): ${formattedNotes}.`;

  const negIdx = basePromptEn.indexOf('--no ');
  if (negIdx !== -1) {
    const before = basePromptEn.slice(0, negIdx).trim();
    const after = basePromptEn.slice(negIdx);
    return `${before} ${activeWindowNote} ${after}`;
  }
  return `${basePromptEn.trim()} ${activeWindowNote}`;
}

export function applyTimelineSceneNotesToScenarioTr(
  baseScenarioTr: string,
  notes: TimelineSceneNote[],
  trimStart: number,
  trimEnd: number
): string {
  if (!notes || notes.length === 0) return baseScenarioTr;
  const sorted = [...notes].sort((a, b) => a.startSec - b.startSec);
  const summaryTr = sorted
    .map((n, idx) => {
      const audioRec = deriveSceneAudioTempoRecommendation({
        descriptionTr: n.descriptionTr,
        cameraNoteTr: n.cameraNoteTr,
        titleTr: n.titleTr,
        category: n.category,
        startSec: n.startSec,
        endSec: n.endSec,
      });
      return `Sahne ${idx + 1} (${n.startSec.toFixed(1)}–${n.endSec.toFixed(1)}sn · ${n.titleTr} · Aksiyon %${audioRec.intensityPct} · ${audioRec.tempoBpm} BPM · SFX: ${audioRec.sfxTitleTr}): ${n.descriptionTr}`;
    })
    .join(' · ');
  return `${baseScenarioTr} [Sahne Kurgu Storyboard & Ses/Tempo Akışı (Aktif Trim ${trimStart.toFixed(1)}–${trimEnd.toFixed(1)}sn): ${summaryTr}]`;
}

export function getMotionIntensityDescriptor(intensity: number): {
  en: string;
  tr: string;
  labelTr: string;
} {
  if (intensity <= 3) {
    return {
      en: `Motion Intensity ${intensity}/10 (calm, simplified single-flow micro-movements, gentle natural head tilt and warm subtle smile, zero sudden head turns or complex spins, preserving 100% locked facial geometry and preventing shifting face)`,
      tr: `Hareket Yoğunluğu ${intensity}/10 (Yüz Koruma Modu: karmaşık dönüşler olmadan sadece hafif gülümseme, yumuşak baş hareketi ve sabit doğrulama kartı tutuşu)`,
      labelTr: 'Yumuşak & Yüz Koruma (Önerilen)',
    };
  }
  if (intensity <= 6) {
    return {
      en: `Motion Intensity ${intensity}/10 (balanced natural human motion physics, controlled poise, realistic hair sway without facial distortion)`,
      tr: `Hareket Yoğunluğu ${intensity}/10 (doğal ve dengeli akıcı vücut fiziği)`,
      labelTr: 'Dengeli & Doğal',
    };
  }
  return {
    en: `Motion Intensity ${intensity}/10 (dynamic, high-energy expressive choreography, pronounced hair and fabric movement, lively social media reel pace)`,
    tr: `Hareket Yoğunluğu ${intensity}/10 (dinamik, enerjik ve yüksek tempolu Reels koreografisi)`,
    labelTr: 'Dinamik & Enerjik',
  };
}

export const ANCHOR_IMAGE_PRESETS: AnchorCharacterPreset[] = [
  {
    id: 'none',
    nameTr: 'Standart Stüdyo Seçimi (Saç Menüsüne Göre)',
    tagEn: 'Dynamic Hair Selector',
    previewImage: hotelDoorwayImg,
    hairId: 'platinum-waves-roots',
    faceAndSkinEn: '',
    faceAndSkinTr: '',
    shortCompressedEn: '',
  },
  {
    id: 'anchor-elena-nordic',
    nameTr: 'Anchor #01 · Elena (Doğal Işıklı Net Portre · Platin Sarışın & Doğal Cilt)',
    tagEn: 'Ref ID: ELENA-01 · Natural Light HD Anchor',
    previewImage: hotelDoorwayImg,
    hairId: 'platinum-waves-roots',
    faceAndSkinEn:
      'an attractive 24-year-old female model (Anchor Identity: Elena-01, captured in clear, even natural key lighting on the face) with long voluminous platinum-blonde wavy hair, piercing blue-grey almond eyes, natural jawline, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no uncanny valley face), and visible fine skin pores',
    faceAndSkinTr:
      'yüz hatları net ve doğal ışıkla aydınlatılmış, plastik/yapay parlaması olmayan yumuşak doğal cilt dokusuna, hafif makyaja, mavi-gri badem gözlere ve hacimli platin sarısı dalgalı saçlara sahip 24 yaşında model (Güçlendirilmiş Karakter Çapası: Elena-01)',
    shortCompressedEn:
      '24yo blonde model (Anchor Elena-01, clear natural face lighting, soft natural skin texture, subtle soft makeup, no plastic sheen, no uncanny valley face, locked facial identity)',
  },
  {
    id: 'anchor-sofia-mediterranean',
    nameTr: 'Anchor #02 · Sofia (Doğal Işıklı Net Portre · Bal Sarışın & Yumuşak Ten)',
    tagEn: 'Ref ID: SOFIA-02 · Natural Light HD Anchor',
    previewImage: penthouseSuiteImg,
    hairId: 'honey-blonde-sleek',
    faceAndSkinEn:
      'a stunning 25-year-old female model (Anchor Identity: Sofia-02, captured in clear, shadow-free natural portrait lighting) with center-parted honey-blonde straight hair, warm hazel-green eyes, natural symmetrical jawline, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no uncanny valley face), and visible fine pores',
    faceAndSkinTr:
      'yüz hatları gölgesiz net ışık alan, aşırı kontür veya plastik görünüm içermeyen yumuşak doğal insan cildi dokusuna, sıcak ela-yeşil gözlere ve düz bal sarısı saçlara sahip 25 yaşında model (Güçlendirilmiş Karakter Çapası: Sofia-02)',
    shortCompressedEn:
      '25yo honey-blonde model (Anchor Sofia-02, clear face lighting, soft natural skin texture, subtle soft makeup, no plastic sheen, no uncanny valley face, locked facial identity)',
  },
  {
    id: 'anchor-chloe-parisian',
    nameTr: 'Anchor #03 · Chloe (Doğal Işıklı Net Portre · Altın Sarışın & Durgun Gözenekli Cilt)',
    tagEn: 'Ref ID: CHLOE-03 · Natural Light HD Anchor',
    previewImage: modernCorridorImg,
    hairId: 'golden-space-buns',
    faceAndSkinEn:
      'a charming 23-year-old blonde female model (Anchor Identity: Chloe-03, evenly lit by soft natural frontal portrait light) styled with double high space-buns and face-framing golden tendrils, sapphire-blue eyes, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no uncanny valley face), and authentic fine skin pores',
    faceAndSkinTr:
      'önden net ve yumuşak doğal portre ışığı alan, plastik/airbrush etkisi olmayan gerçekçi insan cildi dokusuna, hafif makyaja ve altın sarısı çift topuz saç stiline sahip 23 yaşında model (Güçlendirilmiş Karakter Çapası: Chloe-03)',
    shortCompressedEn:
      '23yo golden-blonde model (Anchor Chloe-03, even natural face light, soft natural skin texture, subtle soft makeup, no plastic sheen, no uncanny valley face, locked facial identity)',
  },
  {
    id: 'anchor-valeria-milanese',
    nameTr: 'Anchor #04 · Valeria (Doğal Işıklı Net Portre · Koyu Kestane & Doğal Ten)',
    tagEn: 'Ref ID: VALERIA-04 · Natural Light HD Anchor',
    previewImage: modernCorridorImg,
    hairId: 'espresso-brunette-waves',
    faceAndSkinEn:
      'an alluring 25-year-old brunette female model (Anchor Identity: Valeria-04, illuminated by clear, even natural key lighting on her face) with espresso-brown waves, expressive dark-brown almond eyes, natural jawline, soft natural skin texture, realistic facial features, subtle soft makeup, natural human skin tones (strictly no excessive contouring, no plastic sheen, no uncanny valley face), and visible fine skin pores',
    faceAndSkinTr:
      'yüz hatları net ve dengeli doğal ışıkla aydınlatılmış, plastik parlama veya aşırı bronzluk/kontür içermeyen yumuşak doğal cilt dokusuna ve koyu kestane dalgalı saçlara sahip 25 yaşında esmer model (Güçlendirilmiş Karakter Çapası: Valeria-04)',
    shortCompressedEn:
      '25yo espresso-brunette model (Anchor Valeria-04, clear natural face light, soft natural skin texture, subtle soft makeup, no plastic sheen, no uncanny valley face, locked facial identity)',
  },
];

export function estimateTokenCount(text: string): number {
  const cleaned = text.trim();
  if (!cleaned) return 0;
  const words = cleaned.split(/\s+/).length;
  return Math.max(1, Math.round(words * 1.32));
}

export function compressVideoPromptLocal(fullPrompt: string): string {
  const parts = fullPrompt.split(/\s+--no\s+/i);
  const mainBody = parts[0] || '';
  const negPart = parts[1] ? ` --no ${parts[1].trim()}` : '';

  const compressedBody = mainBody
    .replace(/Vertical 9:16 aspect ratio, 4K UHD resolution, raw photorealistic full-body video with authentic/gi, '9:16 4K raw photorealistic full-body video,')
    .replace(/\[Camera Motion\]: Vertical 9:16 framing with/gi, '[Cam]: 9:16')
    .replace(/\[Subject & Wardrobe\]:/gi, '[Subject]:')
    .replace(/\[Environment & Lighting Mood\]: Standing/gi, '[Scene]:')
    .replace(/\[Dynamic Action & Verification Card/gi, '[Action')
    .replace(/\[Fidelity\]: 4K UHD photorealistic cinema grade,/gi, '[Fidelity]: 4K raw,')
    .replace(/authentic natural skin texture with visible pores and subtle natural imperfections \(strictly no plastic or airbrushed skin\), consistent facial bone structure and identical facial identity across all frames/gi, 'natural skin pores (no airbrushed look), locked facial identity')
    .replace(/luminous natural skin texture with subtle pores,/gi, 'natural skin pores,')
    .replace(/at the start of the shot, she looks directly into the camera lens while holding/gi, 'holding')
    .replace(/at chest height clearly displaying three lines of handwritten text:/gi, 'at chest reading:')
    .replace(/at chest height clearly reading in 3 handwritten lines:/gi, 'at chest reading:')
    .replace(/Maintaining magnetic eye contact, she raises her free index finger to her lips in a playful "shh" silence gesture, then/gi, 'Direct eye contact, finger-to-lips "shh" gesture,')
    .replace(/Looking directly into the lens, she brings her free index finger to her lips for a playful "shh" gesture, then/gi, 'Direct eye contact, finger-to-lips "shh" gesture,')
    .replace(/executes a smooth, unhurried 360-degree full turn in place on her stiletto high heels, showcasing the silhouette of her outfit from every angle before facing the camera again/gi, 'smooth 360° full turn in stiletto heels')
    .replace(/executes a graceful 180-degree half-turn on her stiletto high heels, looking back flirtatiously over her shoulder toward the camera lens before pivoting back to the front/gi, 'graceful 180° over-shoulder turn in stiletto heels')
    .replace(/, finishing by blowing a soft, charming kiss toward the viewer\. Smooth 60fps natural human motion physics, realistic human anatomy\./gi, ', blows kiss. 60fps natural physics.')
    .replace(/, and blows a soft kiss to the camera\./gi, ', blows kiss.')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return `${compressedBody}${negPart}`;
}

export function buildCompletePackage(params: {
  id?: string;
  anchorId?: string;
  customAnchorDescEn?: string;
  customAnchorDescTr?: string;
  customAnchorImageUrl?: string;
  hairId: string;
  wardrobeId: string;
  settingId: string;
  turnAngle: 'soft' | '180' | '360';
  fps?: VideoFpsOption;
  videoSpeed?: VideoSpeedOption;
  lightingMode?: LightingModeId;
  advancedFilterId?: AdvancedPromptFilterId;
  keywordWeightBoost?: KeywordWeightBoost;
  cameraPathOptimized?: boolean;
  verificationCardStyleId?: string;
  motionIntensity?: number;
  cameraSpeedId?: string;
  lightingMoodId?: string;
  globalNegativePrompt?: string;
  autoAppendNegative?: boolean;
  verificationHeader: string;
  verificationDate: string;
  verificationWebsite: string;
  customHairText?: string;
  customWardrobeText?: string;
  customSettingText?: string;
  harmonyPatchesEn?: string[];
  harmonyPatchesTr?: string[];
  code?: string;
}): ContentPackage {
  const anchorOpt =
    ANCHOR_IMAGE_PRESETS.find((a) => a.id === params.anchorId) || ANCHOR_IMAGE_PRESETS[0];
  const hairOpt = HAIR_OPTIONS.find((h) => h.id === params.hairId) || HAIR_OPTIONS[0];
  const wardOpt = WARDROBE_OPTIONS.find((w) => w.id === params.wardrobeId) || WARDROBE_OPTIONS[0];
  const setOpt = SETTING_OPTIONS.find((s) => s.id === params.settingId) || SETTING_OPTIONS[0];
  const cardStyleOpt =
    VERIFICATION_CARD_STYLES.find((c) => c.id === params.verificationCardStyleId) ||
    VERIFICATION_CARD_STYLES[0];

  const selectedFps: VideoFpsOption = params.fps ?? 24;
  const selectedVideoSpeed: VideoSpeedOption = params.videoSpeed ?? 1;
  const selectedLightingMode: LightingModeId =
    params.lightingMode ?? getDefaultLightingModeForSetting(setOpt.id);
  const lightingHarmony = getEnvironmentLightingHarmony(setOpt.id, selectedLightingMode);
  const selectedAdvancedFilter: AdvancedPromptFilterId =
    params.advancedFilterId ?? 'fotogercekci';
  const selectedWeightBoost: KeywordWeightBoost = params.keywordWeightBoost ?? 'guclu';
  const advancedFilterSpec = getAdvancedPromptFilterSpec(
    selectedAdvancedFilter,
    selectedWeightBoost
  );
  const isCameraPathOptimized = params.cameraPathOptimized ?? true;
  const fpsDesc = getFpsDescriptor(selectedFps);
  const videoSpeedDesc = getVideoSpeedDescriptor(selectedVideoSpeed);
  const cameraPathSpec = getCameraPathOptimization(params.turnAngle, selectedFps);
  const motionVal = params.motionIntensity ?? 3;
  const motionDesc = getMotionIntensityDescriptor(motionVal);
  const camSpeedOpt =
    CAMERA_SPEED_OPTIONS.find((c) => c.id === params.cameraSpeedId) || CAMERA_SPEED_OPTIONS[0];
  const lightMoodOpt =
    LIGHTING_MOOD_OPTIONS.find((l) => l.id === params.lightingMoodId) || LIGHTING_MOOD_OPTIONS[0];

  const activeNegative = (params.globalNegativePrompt ?? DEFAULT_NEGATIVE_PROMPT).trim();
  const shouldAppendNeg = params.autoAppendNegative ?? true;

  const harmonyEnBlock =
    params.harmonyPatchesEn && params.harmonyPatchesEn.length > 0
      ? ` ${params.harmonyPatchesEn.join('. ')}.`
      : '';
  const harmonyTrBlock =
    params.harmonyPatchesTr && params.harmonyPatchesTr.length > 0
      ? ` ${params.harmonyPatchesTr.join(' ')}`
      : '';

  const skinAndIdentityEn = `${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, ${SOFT_NATURAL_SKIN_DIRECTIVE_EN}, consistent facial bone structure and identical facial identity across all frames`;

  let charEn: string;
  let charTr: string;
  let shortCharEn: string;

  if (params.customAnchorDescEn?.trim()) {
    charEn = `an attractive modern female model matching the Anchor Reference Image (${params.customAnchorDescEn.trim()}), ${skinAndIdentityEn}`;
    charTr = `${params.customAnchorDescTr?.trim() || params.customAnchorDescEn.trim()} özelliklerine sahip, porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip model`;
    shortCharEn = `uploaded Anchor Model (${params.customAnchorDescEn.trim()}, non-porcelain skin with slight imperfections, natural skin texture, raw phone flash candid, locked facial identity)`;
  } else if (anchorOpt && anchorOpt.id !== 'none' && anchorOpt.faceAndSkinEn) {
    charEn = `${anchorOpt.faceAndSkinEn}, ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}, consistent facial bone structure and identical facial identity across all frames`;
    charTr = `${anchorOpt.faceAndSkinTr} (${NATURAL_HOME_TEXTURE_DIRECTIVE_TR})`;
    shortCharEn = `${anchorOpt.shortCompressedEn}, non-porcelain skin with slight imperfections, everyday home setting`;
  } else if (params.customHairText?.trim()) {
    charEn = `an attractive, modern 24-year-old female model with ${params.customHairText.trim()}, ${skinAndIdentityEn}, and a calm, natural expression`;
    charTr = `${params.customHairText.trim()} saç stiline, porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip modern kadın model`;
    shortCharEn = `24yo female model (${params.customHairText.trim()}, non-porcelain skin with slight imperfections, raw phone flash candid, locked facial identity)`;
  } else {
    charEn = `${hairOpt.promptEn}, ${skinAndIdentityEn}`;
    charTr = `${hairOpt.promptTr} (${NATURAL_HOME_TEXTURE_DIRECTIVE_TR})`;
    shortCharEn = `24yo female model (${hairOpt.shortSpec}, non-porcelain skin with slight imperfections, raw phone flash candid, locked facial identity)`;
  }

  const wardEn = params.customWardrobeText?.trim()
    ? `wearing ${params.customWardrobeText.trim()} and sleek stiletto high heels`
    : wardOpt.promptEn;
  const wardTr = params.customWardrobeText?.trim()
    ? `${params.customWardrobeText.trim()} ve yüksek topuklu stiletto ayakkabı kombini`
    : wardOpt.promptTr;

  const setEn = params.customSettingText?.trim()
    ? `inside ${params.customSettingText.trim()} (everyday casual home environment)`
    : `${setOpt.promptEn} (everyday casual home environment)`;
  const setTr = params.customSettingText?.trim()
    ? `${params.customSettingText.trim()} (günlük ev ortamı)`
    : `${setOpt.promptTr} (günlük ev ortamı)`;

  const cleanHeader = (params.verificationHeader || 'VERIFIED').trim();
  const cleanDate = (params.verificationDate || '04.10.2026').trim();
  const cleanWeb = (params.verificationWebsite ?? '').trim();
  const threeLineString = cleanWeb
    ? `${cleanHeader} / ${cleanDate} / ${cleanWeb}`
    : `${cleanHeader} / ${cleanDate} / `;
  const line3TrDesc = cleanWeb || '[Boş Bırakıldı — İstediğiniz Metni Ekleyebilirsiniz]';

  // Simplified single-flow motion or Timed Camera Path Sequence
  const isSoftMotion = params.turnAngle === 'soft';

  const baseActionBlockEn = isSoftMotion
    ? 'Maintaining calm, steady eye contact with the smartphone camera lens, she offers a soft, warm natural smile and a gentle, unhurried micro head tilt with natural eye blinks and relaxed breathing (strictly no rapid spinning or complex simultaneous gestures, keeping facial features and jawline 100% stable and undistorted)'
    : params.turnAngle === '360'
    ? 'Maintaining steady eye contact, she brings her free index finger to her lips in a gentle "shh" gesture, then executes a smooth, unhurried 360-degree full turn in place on her stiletto high heels before facing the camera again with a soft natural smile'
    : 'Maintaining steady eye contact, she brings her free index finger to her lips in a gentle "shh" gesture, then executes a graceful 180-degree half-turn on her stiletto high heels, looking back softly over her shoulder toward the camera lens';

  const baseActionBlockTr = isSoftMotion
    ? 'yüz hatlarının ve çene yapısının video boyunca hiç bozulmaması için karmaşık dönüşler yapmadan; doğrudan telefon kamerasına bakarak yumuşak, sıcak ve doğal bir gülümseme sunar, başını çok hafif ve doğal bir zarafetle eğer'
    : params.turnAngle === '360'
    ? 'işaret parmağını dudaklarına götürüp yumuşak bir "sus" (shh) işareti yapar; ardından yüksek topuklu ayakkabıları üzerinde kendi etrafında sakin bir 360 derece dönüş yaparak tekrar kameraya döner'
    : 'işaret parmağını dudaklarına götürüp yumuşak bir "sus" (shh) işareti yapar; ardından yüksek topuklu ayakkabıları üzerinde zarif bir 180 derece dönüş yaparak omuz üstünden kameraya bakar';

  const actionBlockEn = isCameraPathOptimized
    ? `${baseActionBlockEn}. ${cameraPathSpec.timedPromptEn}`
    : baseActionBlockEn;

  const actionBlockTr = isCameraPathOptimized
    ? `${baseActionBlockTr}. ${cameraPathSpec.timedScenarioTr}`
    : baseActionBlockTr;

  const cleanNegList = activeNegative.replace(/^--no\s+/i, '').trim();
  const standardNoSuffix =
    shouldAppendNeg && cleanNegList ? ` --no ${cleanNegList}` : '';

  const runwaySpec = getModelDifferentiationSpec('runway', {
    turnAngle: params.turnAngle,
    fps: selectedFps,
    videoSpeed: selectedVideoSpeed,
    motionIntensity: motionVal,
  });
  const klingSpec = getModelDifferentiationSpec('kling', {
    turnAngle: params.turnAngle,
    fps: selectedFps,
    videoSpeed: selectedVideoSpeed,
    motionIntensity: motionVal,
  });
  const lumaSpec = getModelDifferentiationSpec('luma', {
    turnAngle: params.turnAngle,
    fps: selectedFps,
    videoSpeed: selectedVideoSpeed,
    motionIntensity: motionVal,
  });

  // 1. VIDEO PRODUCTION PROMPTS (EN + TR) — Model-Differentiated + Environment-Matched Auto-Lighting + Advanced Style Filter
  const masterVideoEn = `Vertical 9:16 aspect ratio, 4K UHD resolution, ${fpsDesc.promptEn}, raw candid full-body video ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, authentic Fujifilm 400 film grain. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. Camera movement: ${camSpeedOpt.promptEn}. ${motionDesc.en}. Full-length framing of ${charEn}, ${wardEn}, standing ${setEn}. ${lightingHarmony.autoLightingPromptEn}. ${advancedFilterSpec.filterDirectiveEn}. Throughout the shot, she holds ${cardStyleOpt.promptEn} steadily at chest height clearly displaying three lines of handwritten text: Line 1 "${cleanHeader}", Line 2 "${cleanDate}", Line 3 "${cleanWeb}" ("${threeLineString}"). ${actionBlockEn}. ${videoSpeedDesc.directiveEn}.${harmonyEnBlock} Realistic human anatomy, non-porcelain unretouched skin with slight skin imperfections and natural skin texture.${standardNoSuffix}`;

  const runwayVideoEn = `[Camera & Phone Flash Look]: Vertical 9:16 framing, ${fpsDesc.promptEn}, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain, ${camSpeedOpt.promptEn}, full-body head-to-heels framing.\n[Subject & Natural Textures]: ${charEn.charAt(0).toUpperCase() + charEn.slice(1)}, ${wardEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}.\n[Environment & Auto-Lighting]: Standing ${setEn}. ${lightingHarmony.autoLightingPromptEn}.${harmonyEnBlock}\n[Style Tone & Keyword Weights]: ${advancedFilterSpec.filterDirectiveEn}.\n[Action & Verification Card (${cardStyleOpt.shortSpec})]: ${motionDesc.en} at ${selectedFps}fps (${selectedVideoSpeed}x speed). She holds ${cardStyleOpt.promptEn} steadily at chest height clearly reading in 3 handwritten lines: "${threeLineString}". ${actionBlockEn}. ${videoSpeedDesc.directiveEn}.\n${runwaySpec.technicalBlockEn}.\n[Fidelity]: ${selectedFps}fps temporal consistency, unfiltered raw candid aesthetic, non-porcelain skin with slight skin imperfections and natural human skin texture (no plastic sheen, no uncanny valley face), accurate five-finger hand anatomy.${standardNoSuffix}`;

  const klingVideoEn = `[Kling AI 1.6 Pro · 9:16 Vertical Raw Candid Video]: ${fpsDesc.promptEn}, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}.\n[Kling Motion & Camera Jargon]: ${klingSpec.technicalBlockEn}.\n[Subject, Wardrobe & Auto-Lighting]: ${charEn}, ${wardEn}. Setting: ${setEn}. ${lightingHarmony.autoLightingPromptEn}.${harmonyEnBlock}\n[Style Tone & Keyword Weights]: ${advancedFilterSpec.filterDirectiveEn}.\n[Continuous Timeline Choreography (0.0s–5.0s · ${selectedFps}fps · ${selectedVideoSpeed}x speed · motion_intensity=${(motionVal / 10).toFixed(2)})]: She stands poised in high heels holding ${cardStyleOpt.promptEn} at chest level with three handwritten lines "${threeLineString}" facing the lens. ${actionBlockEn}. ${videoSpeedDesc.directiveEn}.${standardNoSuffix}`;

  const lumaVideoEn = `[Keyframe 0 — Start Frame Anchor (keyframe_0_weight=0.98)]: A vertical 9:16 raw candid full-body photograph ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing ${setEn} (${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}) and holding ${cardStyleOpt.promptEn} at chest height reading "${threeLineString}". ${lightingHarmony.autoLightingPromptEn}. ${advancedFilterSpec.filterDirectiveEn}.${harmonyEnBlock}\n[Luma Ray2 Physics & Optical Flow Interpolation (${selectedFps}fps · ${selectedVideoSpeed}x speed)]: ${lumaSpec.technicalBlockEn}. ${actionBlockEn}. ${videoSpeedDesc.directiveEn}.\n[Keyframe 1 — End Frame Target (keyframe_1_weight=0.95)]: Facing the smartphone camera with a soft, natural warm smile, preserving 100% identical facial geometry, crisp 3-line paper text, and unretouched natural skin texture.${standardNoSuffix}`;

  // COMPRESSED VIDEO PROMPTS
  const baseShortTurnEn = isSoftMotion
    ? 'calm direct eye contact, soft natural warm smile and subtle gentle head tilt (locked facial geometry)'
    : params.turnAngle === '360'
    ? 'smooth 360° turn in stiletto heels'
    : 'graceful 180° over-shoulder turn in stiletto heels';

  const shortTurnEn = isCameraPathOptimized
    ? `${baseShortTurnEn} | ${cameraPathSpec.shortCompressedEn} | ${videoSpeedDesc.shortCompressedEn}`
    : `${baseShortTurnEn} | ${videoSpeedDesc.shortCompressedEn}`;

  const compressedMasterEn = `9:16 raw candid video, ${fpsDesc.shortSpec}, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 grain, Motion ${motionVal}/10. Subject: ${shortCharEn}, ${wardEn}, ${setOpt.shortSpec} (everyday home environment). ${lightingHarmony.shortLightingEn}. ${advancedFilterSpec.shortFilterEn}. Holds ${cardStyleOpt.shortSpec} at chest reading 3 handwritten lines: Line 1 "${cleanHeader}", Line 2 "${cleanDate}", Line 3 "${cleanWeb}". ${shortTurnEn}.${harmonyEnBlock} Non-porcelain skin with slight imperfections and natural skin texture.${standardNoSuffix}`;

  const compressedRunwayEn = `[Cam]: 9:16 raw smartphone camera video, ${fpsDesc.shortSpec}, slightly blurry & low-light, direct flash burst, Fujifilm 400 grain.\n[Subject]: ${shortCharEn}, ${wardOpt.shortSpec}.\n[Scene & Light]: Everyday home environment (${setOpt.shortSpec}), ${lightingHarmony.shortLightingEn}. ${advancedFilterSpec.shortFilterEn}.${harmonyEnBlock}\n[Motion ${motionVal}/10 · ${selectedFps}fps · ${selectedVideoSpeed}x]: Holds ${cardStyleOpt.shortSpec} at chest ("${threeLineString}"), ${shortTurnEn}.\n[${runwaySpec.shortTechnicalEn}]. Non-porcelain natural skin texture.${standardNoSuffix}`;

  const compressedKlingEn = `9:16 raw phone camera video (${fpsDesc.shortSpec}) with direct flash, slightly blurry low-light, Fujifilm 400 grain. [${klingSpec.shortTechnicalEn}]. ${shortCharEn}, ${wardOpt.shortSpec}, everyday home environment (${lightingHarmony.shortLightingEn}). ${advancedFilterSpec.shortFilterEn}.${harmonyEnBlock} 0s–5s: Holds ${cardStyleOpt.shortSpec} ("${threeLineString}") at chest, ${shortTurnEn}. Non-porcelain natural skin texture.${standardNoSuffix}`;

  const compressedLumaEn = `Keyframe 0 (Start): 9:16 raw smartphone flash photo, ${fpsDesc.shortSpec}, low-light everyday home (${setOpt.shortSpec}, ${lightingHarmony.shortLightingEn}), ${shortCharEn}, ${wardOpt.shortSpec}, holding ${cardStyleOpt.shortSpec} ("${threeLineString}"). ${advancedFilterSpec.shortFilterEn}.${harmonyEnBlock} [${lumaSpec.shortTechnicalEn}] (${selectedFps}fps · ${selectedVideoSpeed}x): ${shortTurnEn}. Keyframe 1 (End): Soft natural smile, non-porcelain natural skin.${standardNoSuffix}`;

  const videoScenarioTr = `Telefon Çekimi Detayları: "${RAW_PHONE_CAMERA_DIRECTIVE_TR}" Doğal Dokular: "${NATURAL_HOME_TEXTURE_DIRECTIVE_TR}" — Dikey (9:16) formatta, ${fpsDesc.promptTr} ve Fujifilm 400 film dokusuyla ${setTr} içerisinde ${charTr}, üzerinde ${wardTr} ile tam boy kadrajda durmaktadır. Göğüs hizasında tuttuğu ${cardStyleOpt.promptTr} üzerinde 3 satırlı el yazısı doğrulama metnini (1. Satır: ${cleanHeader}, 2. Satır: ${cleanDate}, 3. Satır: ${line3TrDesc}) kameraya net biçimde gösterir; ${actionBlockTr}. ${lightingHarmony.autoLightingScenarioTr}. ${advancedFilterSpec.filterDirectiveTr}. ${videoSpeedDesc.directiveTr}.${harmonyTrBlock}`;

  // 2. MATCHING VERIFICATION PHOTO PROMPT (MIDJOURNEY / DALL-E / FLUX)
  const midjourneyVerifyEn = `Vertical 9:16 full-body candid photograph, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, authentic Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${lightingHarmony.autoLightingPromptEn}. ${advancedFilterSpec.filterDirectiveEn}.${harmonyEnBlock} She is looking directly into the smartphone camera lens with a soft, warm natural expression while holding ${cardStyleOpt.promptEn} steady at chest height with her hands, clearly displaying three lines of neat handwritten text: Line 1 "${cleanHeader}", Line 2 "${cleanDate}", and Line 3 "${cleanWeb}". Direct phone flash reflections, slight organic handheld softness in the background while keeping face and 3-line verification paper legible, non-porcelain unretouched skin with slight skin imperfections and visible pores --ar 9:16 --style raw --v 6.1${standardNoSuffix}`;

  const dalleVerifyEn = `A vertical 9:16 raw candid full-body photograph ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, with subtle Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${lightingHarmony.autoLightingPromptEn}. ${advancedFilterSpec.filterDirectiveEn}.${harmonyEnBlock} She looks directly at the camera with a soft, natural warm smile and holds ${cardStyleOpt.promptEn} at chest level. Written clearly in three centered lines on the ${cardStyleOpt.shortSpec.toLowerCase()} is: "${cleanHeader}" on the first line, "${cleanDate}" on the second line, and "${cleanWeb}" on the third line. Unfiltered raw smartphone flash photo aesthetic, non-porcelain skin with slight skin imperfections and natural skin texture.${standardNoSuffix}`;

  const verifyDescriptionTr = `Telefon Çekimi Detayları: "${RAW_PHONE_CAMERA_DIRECTIVE_TR}" Doğal Dokular: "${NATURAL_HOME_TEXTURE_DIRECTIVE_TR}" — Dikey (9:16) doğrulama fotoğrafı: ${charTr}, ${setTr} içerisinde ${wardTr} ile doğrudan telefon kamerasına doğal bir ifadeyle bakmaktadır. Göğüs hizasında tuttuğu ${cardStyleOpt.promptTr} üzerinde 3 satır halinde "${threeLineString}" metni okunaklı şekilde yer alır. ${lightingHarmony.autoLightingScenarioTr}. ${advancedFilterSpec.filterDirectiveTr}.${harmonyTrBlock}`;

  // COMBINED 6-IN-1 MULTI-POSE EDITORIAL SHOWCASE PROMPT
  const multiPoseShowcaseEn = `Vertical 9:16 aspect ratio, raw candid multi-pose showcase ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, authentic Fujifilm 400 film grain featuring ${charEn}, ${wardEn}. Set ${setEn} (${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}). ${advancedFilterSpec.filterDirectiveEn}. A set of 6 distinct candid home poses without any verification card, maintaining 100% identical facial features and character identity: (1) Full-length mirror flash selfie reflection pose; (2) Relaxed seated pose on the edge of the bed/couch; (3) Candid three-quarter pose adjusting hair; (4) 180-degree over-the-shoulder look showing back silhouette and high heels; (5) Full-length leaning pose against the room doorway/wall; (6) Close-up chest-up flash portrait focusing on direct eye contact and unretouched non-porcelain skin texture --ar 9:16 --style raw --v 6.1${standardNoSuffix}`;

  const multiPoseShowcaseTr = `Telefon Çekimi Detayları: "${RAW_PHONE_CAMERA_DIRECTIVE_TR}" Doğal Dokular: "${NATURAL_HOME_TEXTURE_DIRECTIVE_TR}" — Aynı karakter yüz kimliği (${charTr}), aynı kombin (${wardTr}) ve aynı günlük ev ortamında (${setTr}) 6 farklı kağıtsız ham telefon fotoğrafı pozu. ${advancedFilterSpec.filterDirectiveTr}`;

  // 3. GALLERY PHOTO PACKAGE PROMPTS (6 NORMAL POSES WITHOUT VERIFICATION PAPER)
  const galleryPrompts: GalleryPoseItem[] = [
    {
      poseNumber: 1,
      poseTitleTr: 'Poz 1: Ev Boy Aynası Karşısında Flaşlı Tam Boy Yansıma',
      poseTitleEn: 'Full-Length Home Mirror Flash Reflection Pose',
      promptEn: `Vertical 9:16 raw candid full-body photograph, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing in front of a full-length mirror ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. Her hands are completely empty (no card, no objects), one hand resting on her hip while the other lightly touches the mirror edge, direct camera flash illuminating her natural unretouched skin and outfit --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında boy aynası önünde kağıtsız tam boy poz. ${advancedFilterSpec.filterDirectiveTr}`,
    },
    {
      poseNumber: 2,
      poseTitleTr: 'Poz 2: Yatak / Koltuk Kenarında Doğal Oturuş Pozu',
      poseTitleEn: 'Candid Seated Bedside / Couch Pose',
      promptEn: `Vertical 9:16 raw candid medium-full portrait, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, seated naturally on the edge of the bed/couch ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. She crosses her legs to showcase her stiletto high heels, leaning back casually with empty hands and looking directly into the smartphone camera under direct flash --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında yatak/koltuk kenarında kağıtsız oturuş pozu. ${advancedFilterSpec.filterDirectiveTr}`,
    },
    {
      poseNumber: 3,
      poseTitleTr: 'Poz 3: Saç Düzeltirken Habersiz/Doğal Ev Portresi',
      poseTitleEn: 'Candid Hair Touch Home Flash Portrait',
      promptEn: `Vertical 9:16 raw candid three-quarter length portrait, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. Both hands are raised naturally to adjust her hair near her neck (no card in hands), looking toward the phone lens with a soft spontaneous smile under harsh camera flash --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında saçlarını düzeltirken çekilmiş kağıtsız doğal poz. ${advancedFilterSpec.filterDirectiveTr}`,
    },
    {
      poseNumber: 4,
      poseTitleTr: 'Poz 4: Omuz Üstünden Bakış (180° Sırt & Topuklu Detayı)',
      poseTitleEn: 'Over-the-Shoulder Raw Flash Glance',
      promptEn: `Vertical 9:16 raw candid full-body shot, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, standing ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. Turned 180 degrees away from the camera in her stiletto high heels, turning her head back to look over her shoulder directly into the smartphone lens with direct flash shadows on the wall behind her, empty hands --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında omuz üstünden kameraya bakış pozu. ${advancedFilterSpec.filterDirectiveTr}`,
    },
    {
      poseNumber: 5,
      poseTitleTr: 'Poz 5: Oda Kapısına / Duvara Yaslanma Tam Boy Ev Pozu',
      poseTitleEn: 'Casual Room Doorway Leaning Flash Pose',
      promptEn: `Vertical 9:16 raw candid full-length shot, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, ${wardEn}, leaning casually with one shoulder against the room doorframe/wall ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. One knee slightly bent in stiletto heels, hands empty and relaxed, direct smartphone flash lighting --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında kapı pervazına yaslanma pozu. ${advancedFilterSpec.filterDirectiveTr}`,
    },
    {
      poseNumber: 6,
      poseTitleTr: 'Poz 6: Yakın Plan Flaşlı Yüz & Doğal Ten Portresi (Close-Up)',
      poseTitleEn: 'Close-Up Raw Phone Flash Skin Texture Portrait',
      promptEn: `Vertical 9:16 raw candid chest-up close-up portrait, ${RAW_PHONE_CAMERA_DIRECTIVE_EN}, Fujifilm 400 film grain of ${charEn}, wearing the upper neckline of her ${wardOpt.shortSpec.toLowerCase()}, captured ${setEn}. ${NATURAL_HOME_TEXTURE_DIRECTIVE_EN}. ${advancedFilterSpec.shortFilterEn}. Empty fingertips near her chin, direct smartphone camera flash highlighting authentic non-porcelain skin pores and slight natural imperfections --ar 9:16 --style raw --v 6.1${standardNoSuffix}`,
      descriptionTr: `Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf. Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamında yakın plan göz teması portresi. ${advancedFilterSpec.filterDirectiveTr}`,
    },
  ];

  const previewMap: Record<string, string> = {
    'casual-everyday-home': hotelDoorwayImg,
    'modern-wood-doorway': hotelDoorwayImg,
    'luxury-hotel-suite-drapes': penthouseSuiteImg,
    'dressing-room-vanity-mirror': modernCorridorImg,
    'italian-marble-bathroom': penthouseSuiteImg,
  };

  const uniqueSuffix = Math.random().toString(36).slice(2, 8);

  const resolvedPreviewImage =
    params.customAnchorImageUrl?.trim() ||
    (anchorOpt && anchorOpt.id !== 'none' ? anchorOpt.previewImage : previewMap[setOpt.id]) ||
    hotelDoorwayImg;

  return {
    id: params.id || `pkg-${params.code || 'live'}-${Date.now()}-${uniqueSuffix}`,
    code: params.code || 'PKG-01',
    packageTitleTr: `${setOpt.labelTr.split(':')[0].trim()} · ${
      anchorOpt && anchorOpt.id !== 'none'
        ? anchorOpt.nameTr.split('(')[0].trim()
        : hairOpt.labelTr.split('·')[0].trim()
    } · ${wardOpt.labelTr.split('+')[0].trim()}`,
    previewImage: resolvedPreviewImage,
    anchorId: anchorOpt.id,
    hairId: hairOpt.id,
    wardrobeId: wardOpt.id,
    settingId: setOpt.id,
    turnAngle: params.turnAngle,
    fps: selectedFps,
    videoSpeed: selectedVideoSpeed,
    lightingMode: selectedLightingMode,
    advancedFilterId: selectedAdvancedFilter,
    keywordWeightBoost: selectedWeightBoost,
    cameraPathOptimized: isCameraPathOptimized,
    verificationCardStyleId: cardStyleOpt.id,
    motionIntensity: motionVal,
    cameraSpeedId: camSpeedOpt.id,
    lightingMoodId: lightMoodOpt.id,
    focalLength: camSpeedOpt.shortSpec,
    colorTemp: lightingHarmony.kelvinBadge,
    characterAnchorEn: `${charEn}, ${wardEn}, ${setEn}`,
    characterAnchorTr: `${charTr} | ${wardTr} | ${setTr}`,
    videoPrompt: {
      masterEn: masterVideoEn,
      runwayEn: runwayVideoEn,
      klingEn: klingVideoEn,
      lumaEn: lumaVideoEn,
      compressedMasterEn,
      compressedRunwayEn,
      compressedKlingEn,
      compressedLumaEn,
      negativeEn: activeNegative,
      scenarioTr: videoScenarioTr,
    },
    verificationPhotoPrompt: {
      midjourneyEn: midjourneyVerifyEn,
      dalleEn: dalleVerifyEn,
      descriptionTr: verifyDescriptionTr,
    },
    multiPoseShowcasePrompt: {
      promptEn: multiPoseShowcaseEn,
      descriptionTr: multiPoseShowcaseTr,
    },
    galleryPrompts,
    createdAt: 'Tam İçerik Paketi (Video + Doğrulama + 6 Galeri Pozu)',
  };
}

export const INITIAL_PACKAGES: ContentPackage[] = [
  buildCompletePackage({
    id: 'preset-pkg-01',
    code: 'PKG-01',
    anchorId: 'anchor-elena-nordic',
    hairId: 'platinum-waves-roots',
    wardrobeId: 'crimson-black-corset-heels',
    settingId: 'casual-everyday-home',
    turnAngle: 'soft',
    verificationCardStyleId: 'classic-white-paper',
    motionIntensity: 3,
    cameraSpeedId: 'locked-static',
    lightingMoodId: 'crisp-neutral-indoor',
    verificationHeader: 'VERIFIED',
    verificationDate: '04.10.2026',
    verificationWebsite: '',
  }),
  buildCompletePackage({
    id: 'preset-pkg-02',
    code: 'PKG-02',
    anchorId: 'anchor-chloe-parisian',
    hairId: 'golden-space-buns',
    wardrobeId: 'emerald-halter-lace-cuff',
    settingId: 'luxury-hotel-suite-drapes',
    turnAngle: 'soft',
    verificationCardStyleId: 'digital-holographic-display',
    motionIntensity: 3,
    cameraSpeedId: 'ultra-slow-push',
    lightingMoodId: 'soft-diffused-daylight',
    verificationHeader: '100% VERIFIED',
    verificationDate: '04.10.2026',
    verificationWebsite: '',
  }),
  buildCompletePackage({
    id: 'preset-pkg-03',
    code: 'PKG-03',
    anchorId: 'anchor-sofia-mediterranean',
    hairId: 'honey-blonde-sleek',
    wardrobeId: 'pearl-champagne-satin-robe',
    settingId: 'italian-marble-bathroom',
    turnAngle: '180',
    verificationCardStyleId: 'handwritten-sticky-note',
    motionIntensity: 3,
    cameraSpeedId: 'locked-static',
    lightingMoodId: 'warm-golden-tungsten',
    verificationHeader: 'VERIFIED',
    verificationDate: '04.10.2026',
    verificationWebsite: '',
  }),
];

export function formatPackagesAsJson(packages: ContentPackage[]): string {
  const payload = {
    archiveMetadata: {
      studio: 'Vespera 9:16 — AI Video Prompt Mühendisliği Stüdyosu',
      formatVersion: '1.0',
      exportedAt: new Date().toISOString(),
      aspectRatio: '9:16',
      resolution: '4K UHD',
      filmStock: 'Fujifilm 400',
      totalPackages: packages.length,
    },
    packages: packages.map((pkg, index) => ({
      archiveIndex: index + 1,
      id: pkg.id,
      code: pkg.code,
      packageTitleTr: pkg.packageTitleTr,
      createdAt: pkg.createdAt,
      isAiGenerated: Boolean(pkg.isAiGenerated),
      parameters: {
        anchorId: pkg.anchorId || 'none',
        hairId: pkg.hairId,
        wardrobeId: pkg.wardrobeId,
        settingId: pkg.settingId,
        turnAngle: pkg.turnAngle,
        fps: pkg.fps || 24,
        verificationCardStyleId: pkg.verificationCardStyleId,
        motionIntensity: pkg.motionIntensity,
        cameraSpeedId: pkg.cameraSpeedId,
        lightingMoodId: pkg.lightingMoodId,
        focalLength: pkg.focalLength,
        colorTemp: pkg.colorTemp,
      },
      characterAnchorEn: pkg.characterAnchorEn,
      characterAnchorTr: pkg.characterAnchorTr,
      videoPrompt: {
        runwayEn: pkg.videoPrompt.runwayEn,
        klingEn: pkg.videoPrompt.klingEn,
        lumaEn: pkg.videoPrompt.lumaEn,
        masterEn: pkg.videoPrompt.masterEn,
        compressedRunwayEn: pkg.videoPrompt.compressedRunwayEn,
        compressedKlingEn: pkg.videoPrompt.compressedKlingEn,
        compressedLumaEn: pkg.videoPrompt.compressedLumaEn,
        compressedMasterEn: pkg.videoPrompt.compressedMasterEn,
        negativeEn: pkg.videoPrompt.negativeEn,
        scenarioTr: pkg.videoPrompt.scenarioTr,
      },
      verificationPhotoPrompt: {
        midjourneyEn: pkg.verificationPhotoPrompt.midjourneyEn,
        dalleEn: pkg.verificationPhotoPrompt.dalleEn,
        descriptionTr: pkg.verificationPhotoPrompt.descriptionTr,
      },
      multiPoseShowcasePrompt: {
        promptEn: pkg.multiPoseShowcasePrompt?.promptEn || '',
        descriptionTr: pkg.multiPoseShowcasePrompt?.descriptionTr || '',
      },
      galleryPrompts: pkg.galleryPrompts.map((pose) => ({
        poseNumber: pose.poseNumber,
        poseTitleTr: pose.poseTitleTr,
        poseTitleEn: pose.poseTitleEn,
        promptEn: pose.promptEn,
        descriptionTr: pose.descriptionTr,
      })),
    })),
  };

  return JSON.stringify(payload, null, 2);
}

function escapeCsvCell(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function formatPackagesAsCsv(packages: ContentPackage[]): string {
  const headers: string[] = [
    'Package_Code',
    'Package_Title_TR',
    'Created_At',
    'Is_AI_Generated',
    'Anchor_ID',
    'Hair_ID',
    'Wardrobe_ID',
    'Setting_ID',
    'Turn_Angle',
    'Verification_Card_Style_ID',
    'Motion_Intensity',
    'Camera_Speed_ID',
    'Lighting_Mood_ID',
    'Focal_Length',
    'Color_Temp',
    'Character_Anchor_EN',
    'Character_Anchor_TR',
    'Video_Runway_Gen3_EN',
    'Video_Kling_AI_EN',
    'Video_Luma_Ray2_EN',
    'Video_Master_Universal_EN',
    'Video_Compressed_Runway_EN',
    'Video_Compressed_Kling_EN',
    'Video_Compressed_Luma_EN',
    'Video_Compressed_Master_EN',
    'Video_Negative_Prompt_EN',
    'Video_Scenario_TR',
    'Verification_Photo_Midjourney_EN',
    'Verification_Photo_DALLE_EN',
    'Verification_Photo_Description_TR',
    'MultiPose_6in1_Showcase_EN',
    'MultiPose_6in1_Showcase_TR',
    'Gallery_Pose_1_Title_TR',
    'Gallery_Pose_1_Prompt_EN',
    'Gallery_Pose_1_Description_TR',
    'Gallery_Pose_2_Title_TR',
    'Gallery_Pose_2_Prompt_EN',
    'Gallery_Pose_2_Description_TR',
    'Gallery_Pose_3_Title_TR',
    'Gallery_Pose_3_Prompt_EN',
    'Gallery_Pose_3_Description_TR',
    'Gallery_Pose_4_Title_TR',
    'Gallery_Pose_4_Prompt_EN',
    'Gallery_Pose_4_Description_TR',
    'Gallery_Pose_5_Title_TR',
    'Gallery_Pose_5_Prompt_EN',
    'Gallery_Pose_5_Description_TR',
    'Gallery_Pose_6_Title_TR',
    'Gallery_Pose_6_Prompt_EN',
    'Gallery_Pose_6_Description_TR',
  ];

  const rows = packages.map((pkg) => {
    const getPose = (num: number) =>
      pkg.galleryPrompts.find((g) => g.poseNumber === num) || pkg.galleryPrompts[num - 1];

    const p1 = getPose(1);
    const p2 = getPose(2);
    const p3 = getPose(3);
    const p4 = getPose(4);
    const p5 = getPose(5);
    const p6 = getPose(6);

    const rowValues: unknown[] = [
      pkg.code,
      pkg.packageTitleTr,
      pkg.createdAt,
      pkg.isAiGenerated ? 'TRUE' : 'FALSE',
      pkg.anchorId || 'none',
      pkg.hairId,
      pkg.wardrobeId,
      pkg.settingId,
      `${pkg.turnAngle}°`,
      pkg.verificationCardStyleId,
      pkg.motionIntensity,
      pkg.cameraSpeedId,
      pkg.lightingMoodId,
      pkg.focalLength,
      pkg.colorTemp,
      pkg.characterAnchorEn,
      pkg.characterAnchorTr,
      pkg.videoPrompt.runwayEn,
      pkg.videoPrompt.klingEn,
      pkg.videoPrompt.lumaEn,
      pkg.videoPrompt.masterEn,
      pkg.videoPrompt.compressedRunwayEn,
      pkg.videoPrompt.compressedKlingEn,
      pkg.videoPrompt.compressedLumaEn,
      pkg.videoPrompt.compressedMasterEn,
      pkg.videoPrompt.negativeEn,
      pkg.videoPrompt.scenarioTr,
      pkg.verificationPhotoPrompt.midjourneyEn,
      pkg.verificationPhotoPrompt.dalleEn,
      pkg.verificationPhotoPrompt.descriptionTr,
      pkg.multiPoseShowcasePrompt?.promptEn || '',
      pkg.multiPoseShowcasePrompt?.descriptionTr || '',
      p1?.poseTitleTr || '',
      p1?.promptEn || '',
      p1?.descriptionTr || '',
      p2?.poseTitleTr || '',
      p2?.promptEn || '',
      p2?.descriptionTr || '',
      p3?.poseTitleTr || '',
      p3?.promptEn || '',
      p3?.descriptionTr || '',
      p4?.poseTitleTr || '',
      p4?.promptEn || '',
      p4?.descriptionTr || '',
      p5?.poseTitleTr || '',
      p5?.promptEn || '',
      p5?.descriptionTr || '',
      p6?.poseTitleTr || '',
      p6?.promptEn || '',
      p6?.descriptionTr || '',
    ];

    return rowValues.map(escapeCsvCell).join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

