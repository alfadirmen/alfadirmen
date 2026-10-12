import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Copy,
  Check,
  Shuffle,
  Sparkles,
  Bookmark,
  Trash2,
  Camera,
  Video,
  Images,
  Upload,
  Download,
  Loader2,
  ImagePlus,
  Wand2,
  Repeat,
  Scissors,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ShieldCheck,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Film,
  FileText,
  Palette,
  Edit3,
  Layers,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Volume2,
  Activity,
  Music,
  Clock,
  Printer,
  FileDown,
  X,
} from 'lucide-react';
import {
  HAIR_OPTIONS,
  WARDROBE_OPTIONS,
  SETTING_OPTIONS,
  VERIFICATION_CARD_STYLES,
  CAMERA_SPEED_OPTIONS,
  LIGHTING_MOOD_OPTIONS,
  ANCHOR_IMAGE_PRESETS,
  FPS_OPTIONS,
  VIDEO_SPEED_OPTIONS,
  LIGHTING_MODE_OPTIONS,
  ADVANCED_PROMPT_FILTER_OPTIONS,
  KEYWORD_WEIGHT_BOOST_OPTIONS,
  INITIAL_PACKAGES,
  DEFAULT_NEGATIVE_PROMPT,
  RAW_PHONE_CAMERA_DIRECTIVE_TR,
  NATURAL_HOME_TEXTURE_DIRECTIVE_TR,
  getFpsDescriptor,
  applyFpsToPromptEn,
  applyFpsToScenarioTr,
  getVideoSpeedDescriptor,
  applyVideoSpeedToPromptEn,
  applyVideoSpeedToScenarioTr,
  getDefaultLightingModeForSetting,
  getEnvironmentLightingHarmony,
  applyLightingHarmonyToPromptEn,
  applyLightingHarmonyToScenarioTr,
  getAdvancedPromptFilterSpec,
  applyAdvancedFilterToPromptEn,
  applyAdvancedFilterToScenarioTr,
  getModelDifferentiationSpec,
  enrichPromptWithModelJargon,
  getCameraPathOptimization,
  applyCameraPathToPromptEn,
  applyCameraPathToScenarioTr,
  evaluateVisualQualityBaseline,
  evaluateFiveConceptQualityProgression,
  detectPromptConflicts,
  buildBatchReconciliationPlan,
  buildWaveformTimelineBars,
  SCENE_NOTE_CATEGORIES,
  SCENE_NOTE_QUICK_TEMPLATES,
  getDefaultTimelineSceneNotes,
  buildPromptDirectiveFromSceneNote,
  applyTimelineSceneNotesToPromptEn,
  applyTimelineSceneNotesToScenarioTr,
  compressVideoPromptLocal,
  buildCompletePackage,
  formatPackagesAsJson,
  formatPackagesAsCsv,
  VideoFpsOption,
  VideoSpeedOption,
  VideoModelPlatform,
  LightingModeId,
  AdvancedPromptFilterId,
  KeywordWeightBoost,
  MissingDetailWarning,
  VisualQualityAnalysis,
  PromptConflictWarning,
  PromptConflictResolutionOption,
  TimelineSceneNote,
  SceneNoteCategory,
  CanonicalSceneNoteCategory,
  SceneAudioSfxSynthType,
  SCENE_AUDIO_SFX_PRESETS,
  normalizeSceneNoteCategory,
  getSceneNoteCategoryMeta,
  SceneNoteQuickTemplate,
  SceneAudioTempoRecommendation,
  SceneTransitionIntensityProfile,
  deriveSceneAudioTempoRecommendation,
  calculateSceneTransitionIntensityProfile,
  reorderAndRecalculateSceneNotes,
  ContentPackage,
} from './data/promptEngine';

type StudioThemeId = 'cinematic-dark' | 'clean-light' | 'midnight-slate';
type StudioViewMode = 'simple' | 'full';

type ActiveSection = 'studio' | 'saved';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('studio');
  const [studioTheme, setStudioTheme] = useState<StudioThemeId>('cinematic-dark');
  const [studioViewMode, setStudioViewMode] = useState<StudioViewMode>('simple');
  const [showGuideBanner, setShowGuideBanner] = useState<boolean>(true);
  const [isAdvancedSceneOpen, setIsAdvancedSceneOpen] = useState<boolean>(false);
  const [showEditingReportModal, setShowEditingReportModal] = useState<boolean>(false);
  const [reportFormatTab, setReportFormatTab] = useState<'preview' | 'markdown' | 'json'>('preview');
  const [reportCopied, setReportCopied] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', studioTheme);
  }, [studioTheme]);

  // 1. Classic Core Selections
  const [anchorId, setAnchorId] = useState<string>('anchor-elena-nordic');
  const [customAnchorImageUrl, setCustomAnchorImageUrl] = useState<string>('');
  const [customAnchorFileName, setCustomAnchorFileName] = useState<string>('');
  const [customAnchorDescEn, setCustomAnchorDescEn] = useState<string>('');
  const [customAnchorDescTr, setCustomAnchorDescTr] = useState<string>('');

  const [hairId, setHairId] = useState<string>(HAIR_OPTIONS[0].id);
  const [wardrobeId, setWardrobeId] = useState<string>(WARDROBE_OPTIONS[0].id);
  const [settingId, setSettingId] = useState<string>(SETTING_OPTIONS[0].id);
  const [turnAngle, setTurnAngle] = useState<'soft' | '180' | '360'>('soft');
  const [selectedFps, setSelectedFps] = useState<VideoFpsOption>(24);
  const [videoSpeed, setVideoSpeed] = useState<VideoSpeedOption>(1);
  const [lightingMode, setLightingMode] = useState<LightingModeId>('dogal');
  const [autoSyncLightingWithRoom, setAutoSyncLightingWithRoom] = useState<boolean>(true);
  const [advancedFilterId, setAdvancedFilterId] = useState<AdvancedPromptFilterId>('fotogercekci');
  const [keywordWeightBoost, setKeywordWeightBoost] = useState<KeywordWeightBoost>('guclu');
  const [cameraPathOptimized, setCameraPathOptimized] = useState<boolean>(true);
  const [selectedVideoModel, setSelectedVideoModel] = useState<VideoModelPlatform>('kling');
  const [showAllModelPrompts, setShowAllModelPrompts] = useState<boolean>(false);
  const [useCompressedVideoPrompt, setUseCompressedVideoPrompt] = useState<boolean>(false);

  // 3-Line Verification Paper Text
  const [verificationHeader, setVerificationHeader] = useState<string>('VERIFIED');
  const [verificationDate, setVerificationDate] = useState<string>('04.10.2026');
  const [verificationWebsite, setVerificationWebsite] = useState<string>('vespera.studio');

  // Locked Realism Defaults
  const verificationCardStyleId = VERIFICATION_CARD_STYLES[0].id;
  const [motionIntensity, setMotionIntensity] = useState<number>(3);
  const cameraSpeedId = CAMERA_SPEED_OPTIONS[0].id;
  const lightingMoodId = 'crisp-neutral-indoor';
  const globalNegativePrompt = DEFAULT_NEGATIVE_PROMPT;

  // AI Custom Package Synthesis State
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiOverridePackage, setAiOverridePackage] = useState<ContentPackage | null>(null);
  const [pkgCounter, setPkgCounter] = useState<number>(1);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);

  // AI Visual Quality Score & Missing Detail Analysis State
  const [isAnalyzingQuality, setIsAnalyzingQuality] = useState<boolean>(false);
  const [aiQualityAnalysis, setAiQualityAnalysis] = useState<VisualQualityAnalysis | null>(null);
  const [qualityAnalysisError, setQualityAnalysisError] = useState<string | null>(null);

  // Prompt Conflict Warning, Batch Reconciliation & Quick Repair Wizard State
  const [resolvedConflictMap, setResolvedConflictMap] = useState<
    Record<string, { patchEn: string; patchTr: string; titleTr: string }>
  >({});
  const [conflictNoticeTr, setConflictNoticeTr] = useState<string | null>(null);
  const [showQuickRepairWizard, setShowQuickRepairWizard] = useState<boolean>(true);
  const [quickRepairMode, setQuickRepairMode] = useState<'harmony_keep' | 'smart_preset'>(
    'harmony_keep'
  );
  const [quickRepairAppliedLog, setQuickRepairAppliedLog] = useState<string[]>([]);
  const [previousConfigSnapshot, setPreviousConfigSnapshot] = useState<{
    hairId: string;
    wardrobeId: string;
    settingId: string;
    turnAngle: 'soft' | '180' | '360';
    lightingMode: LightingModeId;
    selectedFps: VideoFpsOption;
    cameraPathOptimized: boolean;
    motionIntensity: number;
    keywordWeightBoost: KeywordWeightBoost;
    verificationHeader: string;
    verificationDate: string;
    verificationWebsite: string;
    resolvedConflictMap: Record<string, { patchEn: string; patchTr: string; titleTr: string }>;
  } | null>(null);

  // Direct 9:16 Image Generation State
  const [isGeneratingVerifyImage, setIsGeneratingVerifyImage] = useState<boolean>(false);
  const [verifyImageProgress, setVerifyImageProgress] = useState<number>(0);
  const [generatedVerifyImageUrl, setGeneratedVerifyImageUrl] = useState<string | null>(null);
  const [verifyImageError, setVerifyImageError] = useState<string | null>(null);

  // 6 Gallery Poses Image Generation State
  const [generatingPoseNumbers, setGeneratingPoseNumbers] = useState<number[]>([]);
  const [generatedGalleryImages, setGeneratedGalleryImages] = useState<Record<number, string>>({});
  const [isGeneratingAllGallery, setIsGeneratingAllGallery] = useState<boolean>(false);
  const [galleryImageError, setGalleryImageError] = useState<string | null>(null);

  // Direct 9:16 Video Generation State
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [videoGenProgress, setVideoGenProgress] = useState<number>(0);
  const [videoGenStageText, setVideoGenStageText] = useState<string>('Hazırlanıyor...');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoGenError, setVideoGenError] = useState<string | null>(null);

  // Expanded Video Metrics, File Format (MP4/WebM), Resolution (1080p/4K) & Interactive Waveform Trim Timeline State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const waveformTrackRef = useRef<HTMLDivElement | null>(null);
  const [showVideoTools, setShowVideoTools] = useState<boolean>(true);
  const [videoDuration, setVideoDuration] = useState<number>(8.0);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(8.0);
  const [playheadTime, setPlayheadTime] = useState<number>(0);
  const [isTimelinePreviewPlaying, setIsTimelinePreviewPlaying] = useState<boolean>(false);
  const [activeTrimDragHandle, setActiveTrimDragHandle] = useState<
    'start' | 'end' | 'playhead' | null
  >(null);
  const [hoveredWaveformBarIndex, setHoveredWaveformBarIndex] = useState<number | null>(null);
  const [isLoopEnabled, setIsLoopEnabled] = useState<boolean>(true);
  const [videoFileFormat, setVideoFileFormat] = useState<'mp4' | 'webm'>('mp4');
  const [videoResolution, setVideoResolution] = useState<'1080p' | '4k'>('4k');
  const [videoNativeWidth, setVideoNativeWidth] = useState<number>(2160);
  const [videoNativeHeight, setVideoNativeHeight] = useState<number>(3840);
  const [generatedVideoSizeBytes, setGeneratedVideoSizeBytes] = useState<number | null>(null);
  const [generatedVideoBlob, setGeneratedVideoBlob] = useState<Blob | null>(null);
  const [activeMapPhase, setActiveMapPhase] = useState<'live' | 0 | 1 | 2>('live');

  // 'Sahne Kurgu Paneli' (Scene Editing & Trim Interval Timeline Notes) State
  const [sceneNotes, setSceneNotes] = useState<TimelineSceneNote[]>(() =>
    getDefaultTimelineSceneNotes({
      turnAngle: 'soft',
      durationSec: 8.0,
      fps: 24,
      verificationHeader: 'VERIFIED',
      verificationDate: '04.10.2026',
      verificationWebsite: 'vespera.studio',
    })
  );
  const [syncSceneNotesToPrompt, setSyncSceneNotesToPrompt] = useState<boolean>(true);
  const [selectedSceneNoteId, setSelectedSceneNoteId] = useState<string | null>('scene-note-1');
  const [editingSceneNoteId, setEditingSceneNoteId] = useState<string | null>(null);
  const [noteDraftTitleTr, setNoteDraftTitleTr] = useState<string>(
    'Sahne 05 · Özel Trim Aralığı Notu'
  );
  const [noteDraftCategory, setNoteDraftCategory] = useState<SceneNoteCategory>('kamera');
  const [noteDraftCameraNoteTr, setNoteDraftCameraNoteTr] = useState<string>(
    '28mm iPhone · Doğal Flaş'
  );
  const [noteDraftDescriptionTr, setNoteDraftDescriptionTr] = useState<string>(
    'Karakter 3 satırlı doğrulama kağıdını göğüs hizasında sabit tutarken hafifçe gülümser; telefon flaşı kağıt dokusunu netleştirir.'
  );
  const [noteDraftCustomDirectiveEn, setNoteDraftCustomDirectiveEn] = useState<string>('');
  const [noteDraftSfxPresetId, setNoteDraftSfxPresetId] = useState<
    'auto' | SceneAudioSfxSynthType
  >('auto');
  const [noteDraftCustomTempoBpm, setNoteDraftCustomTempoBpm] = useState<number | undefined>(
    undefined
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    'all' | CanonicalSceneNoteCategory
  >('all');
  const [hoveredAudioWaveBar, setHoveredAudioWaveBar] = useState<{
    noteId: string;
    barIndex: number;
    timeSec: number;
    dbFs: number;
    amplitudePct: number;
    phaseLabelTr: string;
  } | null>(null);
  const [auditionPlayheadPct, setAuditionPlayheadPct] = useState<number>(0);
  const [sceneNoteBannerTr, setSceneNoteBannerTr] = useState<string | null>(null);
  const [showActionIntensityLayer, setShowActionIntensityLayer] = useState<boolean>(true);
  const [isNoteComposerFocused, setIsNoteComposerFocused] = useState<boolean>(false);
  const [storyboardViewMode, setStoryboardViewMode] = useState<
    'vertical-storyboard' | 'compact-cards'
  >('vertical-storyboard');
  const [draggedSceneNoteIndex, setDraggedSceneNoteIndex] = useState<number | null>(null);
  const [dragOverSceneNoteIndex, setDragOverSceneNoteIndex] = useState<number | null>(null);
  const [playingAudioPreviewId, setPlayingAudioPreviewId] = useState<string | null>(null);

  // Saved Packages
  const [savedPackages, setSavedPackages] = useState<ContentPackage[]>(() => {
    try {
      const raw = localStorage.getItem('vespera_saved_packages_v5');
      if (!raw) return INITIAL_PACKAGES;
      return JSON.parse(raw);
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vespera_saved_packages_v5', JSON.stringify(savedPackages));
    } catch {
      // Ignore storage errors
    }
  }, [savedPackages]);

  const activeHarmonyPatchesEn = useMemo(
    () => Object.values(resolvedConflictMap).map((item) => item.patchEn),
    [resolvedConflictMap]
  );
  const activeHarmonyPatchesTr = useMemo(
    () => Object.values(resolvedConflictMap).map((item) => item.patchTr),
    [resolvedConflictMap]
  );

  const activeConflicts = useMemo(() => {
    return detectPromptConflicts({
      hairId,
      wardrobeId,
      settingId,
      turnAngle,
      resolvedConflictIds: Object.keys(resolvedConflictMap),
    });
  }, [hairId, wardrobeId, settingId, turnAngle, resolvedConflictMap]);

  const compiledPackage = useMemo(() => {
    return buildCompletePackage({
      code: `PKG-${String(pkgCounter).padStart(2, '0')}`,
      anchorId,
      customAnchorDescEn,
      customAnchorDescTr,
      customAnchorImageUrl,
      hairId,
      wardrobeId,
      settingId,
      turnAngle,
      fps: selectedFps,
      videoSpeed,
      lightingMode,
      advancedFilterId,
      keywordWeightBoost,
      cameraPathOptimized,
      verificationCardStyleId,
      motionIntensity,
      cameraSpeedId,
      lightingMoodId,
      globalNegativePrompt,
      autoAppendNegative: true,
      verificationHeader,
      verificationDate,
      verificationWebsite,
      harmonyPatchesEn: activeHarmonyPatchesEn,
      harmonyPatchesTr: activeHarmonyPatchesTr,
    });
  }, [
    pkgCounter,
    anchorId,
    customAnchorDescEn,
    customAnchorDescTr,
    customAnchorImageUrl,
    hairId,
    wardrobeId,
    settingId,
    turnAngle,
    selectedFps,
    videoSpeed,
    lightingMode,
    advancedFilterId,
    keywordWeightBoost,
    cameraPathOptimized,
    motionIntensity,
    verificationCardStyleId,
    cameraSpeedId,
    verificationHeader,
    verificationDate,
    verificationWebsite,
    activeHarmonyPatchesEn,
    activeHarmonyPatchesTr,
  ]);

  const baseCurrentPackage: ContentPackage = aiOverridePackage || compiledPackage;

  const currentPackage: ContentPackage = useMemo(() => {
    if (!syncSceneNotesToPrompt || sceneNotes.length === 0) {
      return baseCurrentPackage;
    }
    const decorateWithSceneNotes = (txt: string) =>
      applyTimelineSceneNotesToPromptEn(txt, sceneNotes, selectedFps, trimStart, trimEnd);

    return {
      ...baseCurrentPackage,
      videoPrompt: {
        ...baseCurrentPackage.videoPrompt,
        masterEn: decorateWithSceneNotes(baseCurrentPackage.videoPrompt.masterEn),
        runwayEn: decorateWithSceneNotes(baseCurrentPackage.videoPrompt.runwayEn),
        klingEn: decorateWithSceneNotes(baseCurrentPackage.videoPrompt.klingEn),
        lumaEn: decorateWithSceneNotes(baseCurrentPackage.videoPrompt.lumaEn),
        compressedMasterEn: decorateWithSceneNotes(
          baseCurrentPackage.videoPrompt.compressedMasterEn
        ),
        compressedRunwayEn: decorateWithSceneNotes(
          baseCurrentPackage.videoPrompt.compressedRunwayEn
        ),
        compressedKlingEn: decorateWithSceneNotes(
          baseCurrentPackage.videoPrompt.compressedKlingEn
        ),
        compressedLumaEn: decorateWithSceneNotes(baseCurrentPackage.videoPrompt.compressedLumaEn),
        scenarioTr: applyTimelineSceneNotesToScenarioTr(
          baseCurrentPackage.videoPrompt.scenarioTr,
          sceneNotes,
          trimStart,
          trimEnd
        ),
      },
    };
  }, [
    baseCurrentPackage,
    syncSceneNotesToPrompt,
    sceneNotes,
    selectedFps,
    trimStart,
    trimEnd,
  ]);
  const activeFpsSpec = useMemo(() => getFpsDescriptor(selectedFps), [selectedFps]);
  const activeSpeedSpec = useMemo(() => getVideoSpeedDescriptor(videoSpeed), [videoSpeed]);
  const activeLightingHarmony = useMemo(
    () => getEnvironmentLightingHarmony(settingId, lightingMode),
    [settingId, lightingMode]
  );
  const activeFilterSpec = useMemo(
    () => getAdvancedPromptFilterSpec(advancedFilterId, keywordWeightBoost),
    [advancedFilterId, keywordWeightBoost]
  );
  const activeCameraPathSpec = useMemo(
    () => getCameraPathOptimization(turnAngle, selectedFps),
    [turnAngle, selectedFps]
  );
  const activeModelSpec = useMemo(
    () =>
      getModelDifferentiationSpec(selectedVideoModel, {
        turnAngle,
        fps: selectedFps,
        videoSpeed,
        motionIntensity,
      }),
    [selectedVideoModel, turnAngle, selectedFps, videoSpeed, motionIntensity]
  );
  const allModelSpecs = useMemo(
    () => ({
      runway: getModelDifferentiationSpec('runway', {
        turnAngle,
        fps: selectedFps,
        videoSpeed,
        motionIntensity,
      }),
      kling: getModelDifferentiationSpec('kling', {
        turnAngle,
        fps: selectedFps,
        videoSpeed,
        motionIntensity,
      }),
      luma: getModelDifferentiationSpec('luma', {
        turnAngle,
        fps: selectedFps,
        videoSpeed,
        motionIntensity,
      }),
    }),
    [turnAngle, selectedFps, videoSpeed, motionIntensity]
  );
  const activeModelPromptText = useMemo(() => {
    if (selectedVideoModel === 'runway') {
      return useCompressedVideoPrompt
        ? currentPackage.videoPrompt.compressedRunwayEn
        : currentPackage.videoPrompt.runwayEn;
    }
    if (selectedVideoModel === 'kling') {
      return useCompressedVideoPrompt
        ? currentPackage.videoPrompt.compressedKlingEn
        : currentPackage.videoPrompt.klingEn;
    }
    return useCompressedVideoPrompt
      ? currentPackage.videoPrompt.compressedLumaEn
      : currentPackage.videoPrompt.lumaEn;
  }, [selectedVideoModel, useCompressedVideoPrompt, currentPackage.videoPrompt]);
  const activeClipDuration = Math.max(0.5, Number((trimEnd - trimStart).toFixed(1)));
  const totalClipFrames = Math.round(activeClipDuration * selectedFps);
  const isCustomTrimActive = trimStart > 0.05 || trimEnd < videoDuration - 0.05;

  const waveformBars = useMemo(
    () =>
      buildWaveformTimelineBars({
        durationSec: videoDuration,
        turnAngle,
        videoSpeed,
        barCount: 48,
      }),
    [videoDuration, turnAngle, videoSpeed]
  );

  const sortedSceneNotes = useMemo(
    () =>
      [...sceneNotes]
        .sort((a, b) => a.startSec - b.startSec)
        .map((n, idx) => ({ ...n, sceneOrder: idx + 1 })),
    [sceneNotes]
  );

  const activePlayheadSceneNote = useMemo(() => {
    const inside = sortedSceneNotes.find(
      (n) => playheadTime >= n.startSec - 0.05 && playheadTime <= n.endSec + 0.05
    );
    return inside || sortedSceneNotes[0] || null;
  }, [sortedSceneNotes, playheadTime]);

  const filteredSceneNotes = useMemo<TimelineSceneNote[]>(() => {
    if (activeCategoryFilter === 'all') return sortedSceneNotes;
    return sortedSceneNotes.filter(
      (n) => normalizeSceneNoteCategory(n.category) === activeCategoryFilter
    );
  }, [sortedSceneNotes, activeCategoryFilter]);

  const categoryNoteCounts = useMemo(() => {
    const counts: Record<'all' | CanonicalSceneNoteCategory, number> = {
      all: sortedSceneNotes.length,
      kamera: 0,
      isik: 0,
      hareket: 0,
      ses: 0,
    };
    const durations: Record<'all' | CanonicalSceneNoteCategory, number> = {
      all: 0,
      kamera: 0,
      isik: 0,
      hareket: 0,
      ses: 0,
    };
    for (const note of sortedSceneNotes) {
      const cat = normalizeSceneNoteCategory(note.category);
      const dur = Math.max(0.5, note.endSec - note.startSec);
      counts[cat] += 1;
      durations[cat] = Number((durations[cat] + dur).toFixed(1));
      durations.all = Number((durations.all + dur).toFixed(1));
    }
    return { counts, durations };
  }, [sortedSceneNotes]);

  const activeActionIntensityProfile = useMemo<SceneTransitionIntensityProfile>(
    () =>
      calculateSceneTransitionIntensityProfile({
        waveformBars,
        durationSec: videoDuration,
        trimStart,
        trimEnd,
        turnAngle,
        videoSpeed,
        motionIntensity,
        noteCategory: noteDraftCategory,
        noteTitleTr: noteDraftTitleTr,
        noteCameraTr: noteDraftCameraNoteTr,
        noteDescriptionTr: noteDraftDescriptionTr,
        sceneNotes: sortedSceneNotes,
        overrideSfxPresetId: noteDraftSfxPresetId,
        overrideTempoBpm: noteDraftCustomTempoBpm,
      }),
    [
      waveformBars,
      videoDuration,
      trimStart,
      trimEnd,
      turnAngle,
      videoSpeed,
      motionIntensity,
      noteDraftCategory,
      noteDraftTitleTr,
      noteDraftCameraNoteTr,
      noteDraftDescriptionTr,
      sortedSceneNotes,
      noteDraftSfxPresetId,
      noteDraftCustomTempoBpm,
    ]
  );

  const handleAssignSceneNoteToCurrentTrim = () => {
    const cleanTitle =
      noteDraftTitleTr.trim() ||
      `Sahne ${String(sceneNotes.length + 1).padStart(2, '0')} · Trim (${trimStart.toFixed(
        1
      )}s–${trimEnd.toFixed(1)}s)`;
    const cleanDesc =
      noteDraftDescriptionTr.trim() ||
      'Karakter 3 satırlı doğrulama kağıdını göğüs hizasında net tutarken doğal telefon flaşı altında kamerayla göz teması kurar.';
    const catMeta = getSceneNoteCategoryMeta(noteDraftCategory);

    const startVal = Number(trimStart.toFixed(1));
    const endVal = Number(Math.max(trimStart + 0.5, trimEnd).toFixed(1));

    const directiveEn = buildPromptDirectiveFromSceneNote(
      {
        startSec: startVal,
        endSec: endVal,
        titleTr: cleanTitle,
        category: catMeta.id,
        cameraNoteTr: noteDraftCameraNoteTr.trim() || '28mm iPhone · Doğal Flaş',
        descriptionTr: cleanDesc,
        customDirectiveEn: noteDraftCustomDirectiveEn.trim() || undefined,
      },
      selectedFps
    );

    if (editingSceneNoteId) {
      setSceneNotes((prev) =>
        prev.map((item) =>
          item.id === editingSceneNoteId
            ? {
                ...item,
                titleTr: cleanTitle,
                startSec: startVal,
                endSec: endVal,
                category: catMeta.id,
                categoryLabelTr: catMeta.shortLabelTr,
                colorHex: catMeta.colorHex,
                cameraNoteTr: noteDraftCameraNoteTr.trim() || '28mm iPhone · Doğal Flaş',
                descriptionTr: cleanDesc,
                promptDirectiveEn: directiveEn,
                selectedSfxPresetId: noteDraftSfxPresetId,
                customTempoBpm: noteDraftCustomTempoBpm,
              }
            : item
        )
      );
      setSelectedSceneNoteId(editingSceneNoteId);
      setEditingSceneNoteId(null);
      setSceneNoteBannerTr(
        `✓ [${catMeta.badgeLabelTr}] "${cleanTitle}" (${startVal.toFixed(1)}sn – ${endVal.toFixed(
          1
        )}sn) notu, ses dalgası zaman çizelgesi (${activeActionIntensityProfile.audioTempo.tempoBpm} BPM) ve aksiyon yoğunluğu katmanı (%${activeActionIntensityProfile.overallIntensityPct}) güncellendi.`
      );
    } else {
      const newId = `scene-note-${Date.now()}`;
      const newNote: TimelineSceneNote = {
        id: newId,
        sceneOrder: sceneNotes.length + 1,
        titleTr: cleanTitle,
        startSec: startVal,
        endSec: endVal,
        category: catMeta.id,
        categoryLabelTr: catMeta.shortLabelTr,
        colorHex: catMeta.colorHex,
        cameraNoteTr: noteDraftCameraNoteTr.trim() || '28mm iPhone · Doğal Flaş',
        descriptionTr: cleanDesc,
        promptDirectiveEn: directiveEn,
        selectedSfxPresetId: noteDraftSfxPresetId,
        customTempoBpm: noteDraftCustomTempoBpm,
      };
      setSceneNotes((prev) => [...prev, newNote]);
      if (activeCategoryFilter !== 'all' && activeCategoryFilter !== catMeta.id) {
        setActiveCategoryFilter('all');
      }
      setSelectedSceneNoteId(newId);
      setNoteDraftTitleTr(
        `Sahne ${String(sceneNotes.length + 2).padStart(2, '0')} · Özel Trim Notu`
      );
      setSceneNoteBannerTr(
        `✓ [${catMeta.badgeLabelTr}] [${startVal.toFixed(1)}sn – ${endVal.toFixed(
          1
        )}sn] trim aralığına "${cleanTitle}" açıklaması ve ses dalgası zaman çizelgesi (${activeActionIntensityProfile.audioTempo.tempoBpm} BPM) atandı.`
      );
    }
  };

  const handleApplyQuickTemplateToDraft = (tpl: SceneNoteQuickTemplate) => {
    setShowActionIntensityLayer(true);
    setNoteDraftTitleTr(
      `${tpl.defaultTitleTr} (${trimStart.toFixed(1)}s–${trimEnd.toFixed(1)}s)`
    );
    setNoteDraftCategory(tpl.category);
    setNoteDraftCameraNoteTr(tpl.cameraNoteTr);
    setNoteDraftDescriptionTr(tpl.descriptionTr);
    setNoteDraftCustomDirectiveEn(tpl.directiveEn);
    setNoteDraftSfxPresetId('auto');
    setNoteDraftCustomTempoBpm(undefined);
  };

  const handleSelectSceneNoteOnTimeline = (note: TimelineSceneNote) => {
    const safeStart = Math.max(0, Math.min(note.startSec, videoDuration - 0.5));
    const safeEnd = Math.min(videoDuration, Math.max(safeStart + 0.5, note.endSec));
    setTrimStart(Number(safeStart.toFixed(1)));
    setTrimEnd(Number(safeEnd.toFixed(1)));
    setPlayheadTime(Number(safeStart.toFixed(1)));
    setSelectedSceneNoteId(note.id);
    if (videoRef.current) {
      videoRef.current.currentTime = safeStart;
    }
  };

  const handleStartEditSceneNote = (note: TimelineSceneNote) => {
    handleSelectSceneNoteOnTimeline(note);
    setShowActionIntensityLayer(true);
    setEditingSceneNoteId(note.id);
    setNoteDraftTitleTr(note.titleTr);
    setNoteDraftCategory(normalizeSceneNoteCategory(note.category));
    setNoteDraftCameraNoteTr(note.cameraNoteTr);
    setNoteDraftDescriptionTr(note.descriptionTr);
    setNoteDraftCustomDirectiveEn('');
    setNoteDraftSfxPresetId(note.selectedSfxPresetId || 'auto');
    setNoteDraftCustomTempoBpm(note.customTempoBpm);
    setSceneNoteBannerTr(
      `✦ "${note.titleTr}" (${note.startSec.toFixed(1)}sn–${note.endSec.toFixed(
        1
      )}sn) düzenleme modunda: Renkli aksiyon yoğunluğu katmanı ve gerçek zamanlı ses dalgası zaman çizelgesi aktif.`
    );
  };

  const handleChangeNoteCategory = (
    noteId: string,
    nextCategory: CanonicalSceneNoteCategory
  ) => {
    const catMeta = getSceneNoteCategoryMeta(nextCategory);
    setSceneNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const updatedDirective = buildPromptDirectiveFromSceneNote(
          {
            startSec: n.startSec,
            endSec: n.endSec,
            titleTr: n.titleTr,
            category: catMeta.id,
            cameraNoteTr: n.cameraNoteTr,
            descriptionTr: n.descriptionTr,
          },
          selectedFps
        );
        return {
          ...n,
          category: catMeta.id,
          categoryLabelTr: catMeta.shortLabelTr,
          colorHex: catMeta.colorHex,
          promptDirectiveEn: updatedDirective,
        };
      })
    );
    setSceneNoteBannerTr(
      `✓ Sahne notu kategorisi [${catMeta.badgeLabelTr}] (${catMeta.shortLabelTr}) olarak güncellendi ve renk etiketi yenilendi.`
    );
  };

  const handleSelectNoteSfxPreset = (
    noteId: string,
    presetId: 'auto' | SceneAudioSfxSynthType
  ) => {
    const presetMeta = SCENE_AUDIO_SFX_PRESETS.find((p) => p.id === presetId);
    setSceneNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? {
              ...n,
              selectedSfxPresetId: presetId,
              customTempoBpm:
                presetId === 'auto' ? undefined : presetMeta?.defaultBpm || n.customTempoBpm,
            }
          : n
      )
    );
    if (presetMeta) {
      setSceneNoteBannerTr(
        `✓ Ses dalgası zaman çizelgesi "${presetMeta.shortLabelTr}" (${presetMeta.sfxTitleTr}) profiline göre gerçek zamanlı güncellendi.`
      );
    }
  };

  const handleAdjustNoteTempoBpm = (
    noteId: string,
    currentBpm: number,
    deltaBpm: number
  ) => {
    const nextBpm = Math.max(64, Math.min(156, currentBpm + deltaBpm));
    setSceneNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, customTempoBpm: nextBpm } : n))
    );
  };

  const handleSmoothTransitionIntensity = () => {
    setShowActionIntensityLayer(true);
    const currentDur = trimEnd - trimStart;
    if (currentDur < 2.4) {
      const nextStart = Math.max(0, Number((trimStart - 0.4).toFixed(1)));
      const nextEnd = Math.min(videoDuration, Number((trimEnd + 0.5).toFixed(1)));
      setTrimStart(nextStart);
      setTrimEnd(nextEnd);
    }
    const dampingClause =
      ' Giriş ve çıkış karelerinde 0.3sn yumuşak hız sönümleme (ease-in-out) uygulanarak yüz hatları ve 3 satırlı doğrulama kağıdı sabit odakla korunur.';
    if (!noteDraftDescriptionTr.includes('yumuşak hız sönümleme')) {
      setNoteDraftDescriptionTr((prev) => `${prev.trim()}${dampingClause}`);
    }
    setSceneNoteBannerTr(
      `✓ Seçili trim aralığı için sahne geçiş şiddeti yumuşatıldı (0.3sn ease-in-out rampa eklendi) ve dalga formu aksiyon yoğunluğu dengelendi.`
    );
  };

  const handleInjectAudioTempoToNoteDraft = () => {
    const rec = activeActionIntensityProfile.audioTempo;
    const audioClauseTr = ` [Ses & Tempo: ${rec.sfxTitleTr} · ${rec.tempoLabelTr}]`;
    if (!noteDraftDescriptionTr.includes('[Ses & Tempo:')) {
      setNoteDraftDescriptionTr((prev) => `${prev.trim()}${audioClauseTr}`);
    }
    setSceneNoteBannerTr(
      `✓ "${rec.sfxTitleTr}" ve "${rec.tempoLabelTr}" önerisi düzenlenen sahne notuna eklendi.`
    );
  };

  const handleInjectAudioTempoToExistingNote = (note: TimelineSceneNote) => {
    const rec = deriveSceneAudioTempoRecommendation({
      descriptionTr: note.descriptionTr,
      cameraNoteTr: note.cameraNoteTr,
      titleTr: note.titleTr,
      category: note.category,
      startSec: note.startSec,
      endSec: note.endSec,
      turnAngle,
      videoSpeed,
      motionIntensity,
      overrideSfxPresetId: note.selectedSfxPresetId || 'auto',
      overrideTempoBpm: note.customTempoBpm,
    });
    const audioClauseTr = ` [Ses & Tempo: ${rec.sfxTitleTr} · ${rec.tempoLabelTr}]`;
    const nextDesc = note.descriptionTr.includes('[Ses & Tempo:')
      ? note.descriptionTr
      : `${note.descriptionTr.trim()}${audioClauseTr}`;

    setSceneNotes((prev) =>
      prev.map((n) => {
        if (n.id !== note.id) return n;
        const updatedDirective = buildPromptDirectiveFromSceneNote(
          {
            startSec: n.startSec,
            endSec: n.endSec,
            titleTr: n.titleTr,
            category: n.category,
            cameraNoteTr: n.cameraNoteTr,
            descriptionTr: nextDesc,
          },
          selectedFps
        );
        return {
          ...n,
          descriptionTr: nextDesc,
          promptDirectiveEn: `${updatedDirective} [${rec.promptAudioCueEn}]`,
        };
      })
    );
    setSceneNoteBannerTr(
      `✓ Sahne 0${note.sceneOrder} için "${rec.sfxTitleTr}" (${rec.tempoBpm} BPM) ses ve tempo direktifi nota ve video promptuna işlendi.`
    );
  };

  const handleReorderSceneNote = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= sortedSceneNotes.length ||
      toIndex >= sortedSceneNotes.length
    ) {
      return;
    }

    const updatedNotes = reorderAndRecalculateSceneNotes({
      notes: sortedSceneNotes,
      fromIndex,
      toIndex,
      totalDurationSec: videoDuration,
      fps: selectedFps,
    });

    setSceneNotes(updatedNotes);
    const movedNote = updatedNotes[toIndex];
    if (movedNote) {
      setSelectedSceneNoteId(movedNote.id);
      setTrimStart(movedNote.startSec);
      setTrimEnd(movedNote.endSec);
      setPlayheadTime(movedNote.startSec);
      setSceneNoteBannerTr(
        `✓ Storyboard sırası değiştirildi: "${movedNote.titleTr}" #${
          toIndex + 1
        }. sıraya (${movedNote.startSec.toFixed(1)}sn–${movedNote.endSec.toFixed(
          1
        )}sn) taşındı ve tüm sahne zaman aralıkları yeniden hesaplandı.`
      );
    }
  };

  const handleAuditionSceneAudioTempo = (
    audioTempo: SceneAudioTempoRecommendation,
    previewId: string,
    noteRange?: { startSec: number; endSec: number }
  ) => {
    if (playingAudioPreviewId === previewId) {
      setPlayingAudioPreviewId(null);
      setAuditionPlayheadPct(0);
      return;
    }
    setPlayingAudioPreviewId(previewId);
    setAuditionPlayheadPct(0);

    // Animate real-time soundwave cursor & playhead across the note's interval
    const startTs = performance.now();
    const totalMs = 1150;
    const stepAnim = (nowTs: number) => {
      const elapsed = nowTs - startTs;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setAuditionPlayheadPct(pct);
      if (noteRange) {
        const curSec = Number(
          (
            noteRange.startSec +
            (pct / 100) * Math.max(0.5, noteRange.endSec - noteRange.startSec)
          ).toFixed(2)
        );
        setPlayheadTime(curSec);
      }
      if (elapsed < totalMs) {
        window.requestAnimationFrame(stepAnim);
      }
    };
    window.requestAnimationFrame(stepAnim);

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const beatInterval = 60 / Math.max(60, audioTempo.tempoBpm);

        // Synthesize 4 rhythmic tempo pulses + bespoke foley texture
        for (let b = 0; b < 4; b++) {
          const t = now + b * beatInterval * 0.45;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          if (audioTempo.synthType === 'focus-click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(b === 0 ? 880 : 1180, t);
            osc.frequency.exponentialRampToValueAtTime(340, t + 0.08);
            gain.gain.setValueAtTime(0.11, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
          } else if (audioTempo.synthType === 'heel-whoosh') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(b === 1 || b === 2 ? 270 : 185, t);
            osc.frequency.exponentialRampToValueAtTime(75, t + 0.16);
            gain.gain.setValueAtTime(0.16, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          } else if (audioTempo.synthType === 'flash-transient') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1480, t);
            osc.frequency.exponentialRampToValueAtTime(420, t + 0.11);
            gain.gain.setValueAtTime(0.12, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
          } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(210 + b * 36, t);
            osc.frequency.exponentialRampToValueAtTime(115, t + 0.15);
            gain.gain.setValueAtTime(0.13, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
          }

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.2);
        }

        window.setTimeout(() => {
          ctx.close().catch(() => {});
          setPlayingAudioPreviewId((prev) => (prev === previewId ? null : prev));
          setAuditionPlayheadPct(0);
        }, 1180);
      } else {
        window.setTimeout(() => {
          setPlayingAudioPreviewId(null);
          setAuditionPlayheadPct(0);
        }, 1180);
      }
    } catch {
      window.setTimeout(() => {
        setPlayingAudioPreviewId(null);
        setAuditionPlayheadPct(0);
      }, 1180);
    }
  };

  const handleSyncNoteToActiveTrim = (noteId: string) => {
    const startVal = Number(trimStart.toFixed(1));
    const endVal = Number(Math.max(trimStart + 0.5, trimEnd).toFixed(1));
    setSceneNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const updatedDirective = buildPromptDirectiveFromSceneNote(
          {
            startSec: startVal,
            endSec: endVal,
            titleTr: n.titleTr,
            category: n.category,
            cameraNoteTr: n.cameraNoteTr,
            descriptionTr: n.descriptionTr,
          },
          selectedFps
        );
        return {
          ...n,
          startSec: startVal,
          endSec: endVal,
          promptDirectiveEn: updatedDirective,
        };
      })
    );
    setSelectedSceneNoteId(noteId);
    setSceneNoteBannerTr(
      `✓ Sahne notunun zaman aralığı aktif dalga formu seçimine (${startVal.toFixed(
        1
      )}sn – ${endVal.toFixed(1)}sn) eşitlendi.`
    );
  };

  const handleDeleteSceneNote = (noteId: string) => {
    setSceneNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (editingSceneNoteId === noteId) {
      setEditingSceneNoteId(null);
    }
  };

  const handleResetDefaultSceneNotes = () => {
    const defaults = getDefaultTimelineSceneNotes({
      turnAngle,
      durationSec: videoDuration,
      fps: selectedFps,
      verificationHeader,
      verificationDate,
      verificationWebsite,
    });
    setSceneNotes(defaults);
    setEditingSceneNoteId(null);
    setSelectedSceneNoteId(defaults[0]?.id || null);
    setSceneNoteBannerTr(
      '✓ Varsayılan 3 fazlı Sahne Kurgu Paneli notları (Açılış, Ana Aksiyon ve Final) zaman çizelgesine yüklendi.'
    );
  };

  const scrollToStudioSection = (elementId: string) => {
    setActiveSection('studio');
    if (elementId === 'step-04-scene-editor') {
      setIsAdvancedSceneOpen(true);
    }
    window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const generateEditingReportMarkdown = (): string => {
    const nowStr = new Date().toLocaleString('tr-TR', {
      dateStyle: 'long',
      timeStyle: 'medium',
    });
    const totalSec = categoryNoteCounts.durations.all;
    const totalCount = sortedSceneNotes.length;
    const avgSec = totalCount > 0 ? (totalSec / totalCount).toFixed(1) : '0.0';

    let doc = `# 🎬 9:16 DİKEY SİNEMATİK SAHNE KURGU VE SES DALGASI RAPORU\n\n`;
    doc += `> **Oluşturulma Tarihi:** ${nowStr}\n`;
    doc += `> **Format & En-Boy Oranı:** 9:16 Dikey (TikTok, Instagram Reels, Shorts) · 4K UHD (2160x3840)\n`;
    doc += `> **Film Dokusu:** Fujifilm Superia 400 Grain, Doğal Cilt Gözenekleri (Airbrush / Plastik Yok)\n`;
    doc += `> **Toplam Kurgu Süresi:** ${totalSec.toFixed(1)} sn | **Kare Hızı:** ${selectedFps} FPS | **Hız:** ${videoSpeed}x\n\n`;

    const activeAnchor = ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId) || ANCHOR_IMAGE_PRESETS[1];
    const activeSetting = SETTING_OPTIONS.find((s) => s.id === settingId) || SETTING_OPTIONS[0];
    const characterName = customAnchorFileName ? `Özel Görsel (${customAnchorFileName})` : activeAnchor.nameTr;
    const settingName = activeSetting.labelTr;
    const settingVibe = activeSetting.detailTr;

    doc += `---\n\n`;
    doc += `## 📋 1. PROJE VE MODEL BİLGİLERİ\n\n`;
    doc += `- **Karakter / Model:** ${characterName} (${activeAnchor.tagEn || 'Karakter Çapası'})\n`;
    doc += `- **Mekan & Atmosfer:** ${settingName} (${settingVibe})\n`;
    doc += `- **Fiziksel Doğrulama Kağıdı (3 Satırlı Net El Yazısı):**\n`;
    doc += `  - **1. Satır (Başlık):** "${verificationHeader}"\n`;
    doc += `  - **2. Satır (Tarih):** "${verificationDate}"\n`;
    doc += `  - **3. Satır (Platform):** "${verificationWebsite}"\n`;
    doc += `- **Kamera & Işık:** 85mm f/1.4 portre lens, yumuşak doğal ışık, gerçekçi ten kusurları ve göz yansımaları\n\n`;

    doc += `## 📊 2. KATEGORİ DAĞILIM METRİKLERİ (KAMERA, IŞIK, HAREKET, SES)\n\n`;
    doc += `| Kategori | Sahne Notu Sayısı | Toplam Süre (sn) | Zaman Payı (%) | Ortalama Süre (sn) |\n`;
    doc += `|---|:---:|:---:|:---:|:---:|\n`;
    SCENE_NOTE_CATEGORIES.forEach((c) => {
      const count = categoryNoteCounts.counts[c.id] || 0;
      const dur = categoryNoteCounts.durations[c.id] || 0;
      const pct = totalSec > 0 ? ((dur / totalSec) * 100).toFixed(0) : '0';
      const avg = count > 0 ? (dur / count).toFixed(1) : '0.0';
      doc += `| **${c.badgeLabelTr}** | ${count} | ${dur.toFixed(1)} sn | %${pct} | ${avg} sn |\n`;
    });
    doc += `| **GENEL TOPLAM** | **${totalCount}** | **${totalSec.toFixed(1)} sn** | **%100** | **${avgSec} sn** |\n\n`;

    doc += `## ⏱️ 3. ZAMAN ÇİZELGESİ SAHNE NOTLARI VE SES DALGASI ANALİZİ\n\n`;
    sortedSceneNotes.forEach((note, index) => {
      const catMeta = getSceneNoteCategoryMeta(note.category);
      const rec = deriveSceneAudioTempoRecommendation({
        descriptionTr: note.descriptionTr,
        cameraNoteTr: note.cameraNoteTr,
        titleTr: note.titleTr,
        category: note.category,
        startSec: note.startSec,
        endSec: note.endSec,
        turnAngle,
        videoSpeed,
        motionIntensity,
        overrideSfxPresetId: note.selectedSfxPresetId || 'auto',
        overrideTempoBpm: note.customTempoBpm,
      });
      const clipDur = Math.max(0.1, note.endSec - note.startSec);
      const startFrame = Math.round(note.startSec * selectedFps);
      const endFrame = Math.round(note.endSec * selectedFps);

      const asciiWave = rec.soundwaveBars
        .map((b) => {
          const h = Math.round(b.amplitude * 7);
          const chars = [' ', ' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
          return chars[Math.min(chars.length - 1, Math.max(0, h))];
        })
        .join('');

      doc += `### Sahne ${String(index + 1).padStart(2, '0')}: ${note.titleTr}\n\n`;
      doc += `- **Kategori:** \`${catMeta.badgeLabelTr}\`\n`;
      doc += `- **Zaman Aralığı:** ${note.startSec.toFixed(1)}s – ${note.endSec.toFixed(1)}s (${clipDur.toFixed(1)} sn) | **Kareler:** ${startFrame} – ${endFrame} (@${selectedFps} FPS)\n`;
      doc += `- **Kamera & Işık Direktifi:** ${note.cameraNoteTr}\n`;
      doc += `- **Ses Efekti (SFX):** ${rec.sfxTitleTr} — *${rec.sfxDetailTr}*\n`;
      doc += `- **Tempo & Yoğunluk:** ${rec.tempoBpm} BPM (${rec.tempoLabelTr}) | Aksiyon Yoğunluğu: %${rec.intensityPct} (${rec.levelLabelTr})\n`;
      doc += `- **Akustik Düzeyler:** Tepe: ${rec.peakDbFs} dBFS | Entegre: ${rec.avgLufs} LUFS | Ritim İpucu: ${rec.rhythmCueTr}\n`;
      doc += `- **Gerçek Zamanlı Ses Dalgası (28-Bar ASCII Spektrumu):**\n`;
      doc += `  \`\`\`\n  [${asciiWave}] (dBFS: ${rec.peakDbFs})\n  \`\`\`\n`;
      doc += `- **Türkçe Açıklama:** ${note.descriptionTr}\n`;
      doc += `- **İngilizce 9:16 Prompt Direktifi:**\n`;
      doc += `  > ${note.promptDirectiveEn}\n\n`;
    });

    doc += `## 🚫 4. STANDART NEGATİF PARAMETRELER (NEGATIVE PROMPT)\n\n`;
    doc += `\`\`\`text\n${DEFAULT_NEGATIVE_PROMPT}\n\`\`\`\n\n`;
    doc += `---\n\n`;
    doc += `*Rapor Oluşturucu: 9:16 Dikey Sosyal Medya AI Video & Görsel Prompt Stüdyosu — Fujifilm 400 Grain & Real Skin Engine*\n`;

    return doc;
  };

  const handleDownloadEditingReportText = (format: 'md' | 'txt') => {
    const content = generateEditingReportMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `kurgu_raporu_9-16_sinematik_${dateStr}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSceneNoteBannerTr(`✓ Kurgu raporu ${format.toUpperCase()} formatında başarıyla indirildi.`);
  };

  const handleDownloadEditingReportJson = () => {
    const reportData = {
      projectTitle: '9:16 Dikey Sinematik Sahne Kurgu ve Ses Dalgası Raporu',
      generatedAt: new Date().toISOString(),
      format: {
        aspectRatio: '9:16',
        resolution: '4K UHD (2160x3840)',
        fps: selectedFps,
        speed: videoSpeed,
        filmGrain: 'Fujifilm 400',
        totalDurationSec: categoryNoteCounts.durations.all,
        totalFrames: Math.round(categoryNoteCounts.durations.all * selectedFps),
      },
      character: {
        name: customAnchorFileName
          ? `Özel Görsel (${customAnchorFileName})`
          : (ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId) || ANCHOR_IMAGE_PRESETS[1]).nameTr,
        tag: (ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId) || ANCHOR_IMAGE_PRESETS[1]).tagEn,
      },
      setting: {
        nameTr: (SETTING_OPTIONS.find((s) => s.id === settingId) || SETTING_OPTIONS[0]).labelTr,
        vibeTr: (SETTING_OPTIONS.find((s) => s.id === settingId) || SETTING_OPTIONS[0]).detailTr,
      },
      verificationNote: {
        line1Title: verificationHeader,
        line2Date: verificationDate,
        line3Platform: verificationWebsite,
      },
      categorySummary: {
        durations: categoryNoteCounts.durations,
        counts: categoryNoteCounts.counts,
      },
      scenes: sortedSceneNotes.map((note, idx) => {
        const catMeta = getSceneNoteCategoryMeta(note.category);
        const rec = deriveSceneAudioTempoRecommendation({
          descriptionTr: note.descriptionTr,
          cameraNoteTr: note.cameraNoteTr,
          titleTr: note.titleTr,
          category: note.category,
          startSec: note.startSec,
          endSec: note.endSec,
          turnAngle,
          videoSpeed,
          motionIntensity,
          overrideSfxPresetId: note.selectedSfxPresetId || 'auto',
          overrideTempoBpm: note.customTempoBpm,
        });
        return {
          sceneNumber: idx + 1,
          id: note.id,
          titleTr: note.titleTr,
          category: note.category,
          categoryLabelTr: catMeta.badgeLabelTr,
          timecode: {
            startSec: note.startSec,
            endSec: note.endSec,
            durationSec: Number((note.endSec - note.startSec).toFixed(2)),
            startFrame: Math.round(note.startSec * selectedFps),
            endFrame: Math.round(note.endSec * selectedFps),
          },
          cameraDirectiveTr: note.cameraNoteTr,
          descriptionTr: note.descriptionTr,
          promptDirectiveEn: note.promptDirectiveEn,
          audioWaveform: {
            sfxPresetTitle: rec.sfxTitleTr,
            sfxDetail: rec.sfxDetailTr,
            tempoBpm: rec.tempoBpm,
            tempoLabel: rec.tempoLabelTr,
            actionIntensityPct: rec.intensityPct,
            level: rec.level,
            peakDbFs: rec.peakDbFs,
            avgLufs: rec.avgLufs,
            rhythmCue: rec.rhythmCueTr,
            bars: rec.soundwaveBars.map((b) => ({
              index: b.index,
              timeSec: Number(b.timeSec.toFixed(2)),
              amplitude: Number(b.amplitude.toFixed(3)),
              dbFs: b.dbFs,
              isBeatMarker: b.isBeatMarker,
              isTransientPeak: b.isTransientPeak,
              phaseLabel: b.phaseLabelTr,
            })),
          },
        };
      }),
      negativePrompt: DEFAULT_NEGATIVE_PROMPT,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `kurgu_raporu_verileri_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSceneNoteBannerTr('✓ Kurgu raporu JSON veri paketi başarıyla indirildi.');
  };

  const handlePrintEditingReport = () => {
    window.print();
  };

  const handleCopyReportText = () => {
    const text = generateEditingReportMarkdown();
    handleCopyText(text, 'editing-report-markdown');
    setReportCopied(true);
    window.setTimeout(() => setReportCopied(false), 2500);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed, generatedVideoUrl]);

  // Keep playhead clamped within [trimStart, trimEnd] when trim boundaries change
  useEffect(() => {
    setPlayheadTime((prev) => {
      if (prev < trimStart) return trimStart;
      if (prev > trimEnd) return trimStart;
      return prev;
    });
  }, [trimStart, trimEnd]);

  // Simulated waveform timeline playback when previewing trim range
  useEffect(() => {
    if (!isTimelinePreviewPlaying) return;
    const stepMs = 80;
    const deltaSec = (stepMs / 1000) * videoSpeed;
    const timer = window.setInterval(() => {
      if (generatedVideoUrl && videoRef.current && !videoRef.current.paused) {
        setPlayheadTime(Number(videoRef.current.currentTime.toFixed(2)));
        return;
      }
      setPlayheadTime((prev) => {
        const next = Number((prev + deltaSec).toFixed(2));
        if (next >= trimEnd) {
          if (isLoopEnabled) {
            return trimStart;
          }
          setIsTimelinePreviewPlaying(false);
          return trimEnd;
        }
        return next;
      });
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [isTimelinePreviewPlaying, trimStart, trimEnd, videoSpeed, isLoopEnabled, generatedVideoUrl]);

  // Pointer drag support for interactive waveform trim handles (IN / OUT / Playhead)
  useEffect(() => {
    if (!activeTrimDragHandle) return;

    const handlePointerMove = (e: PointerEvent) => {
      const trackEl = waveformTrackRef.current;
      if (!trackEl) return;
      const rect = trackEl.getBoundingClientRect();
      if (rect.width <= 0) return;
      const clampedRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const sec = Number((clampedRatio * videoDuration).toFixed(1));

      if (activeTrimDragHandle === 'start') {
        const nextStart = Math.max(0, Math.min(sec, Number((trimEnd - 0.5).toFixed(1))));
        setTrimStart(nextStart);
      } else if (activeTrimDragHandle === 'end') {
        const nextEnd = Math.min(
          videoDuration,
          Math.max(sec, Number((trimStart + 0.5).toFixed(1)))
        );
        setTrimEnd(nextEnd);
      } else if (activeTrimDragHandle === 'playhead') {
        const nextPlayhead = Math.max(trimStart, Math.min(trimEnd, sec));
        setPlayheadTime(nextPlayhead);
        if (videoRef.current) {
          videoRef.current.currentTime = nextPlayhead;
        }
      }
    };

    const handlePointerUp = () => {
      setActiveTrimDragHandle(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [activeTrimDragHandle, trimStart, trimEnd, videoDuration]);

  const resolutionSpec = useMemo(() => {
    if (videoResolution === '4k') {
      const bitrateMult = selectedFps === 60 ? '34.5 Mbps' : selectedFps === 30 ? '24.0 Mbps' : '19.5 Mbps';
      const sizeMult = selectedFps === 60 ? '~32.4 MB' : selectedFps === 30 ? '~22.5 MB' : '~18.3 MB';
      return {
        width: 2160,
        height: 3840,
        labelTr: '4K UHD (2160×3840)',
        shortLabel: '4K',
        estBitrateMbps: bitrateMult,
        estFileSizeMb: sizeMult,
        promptTagEn: '4K UHD resolution (2160x3840)',
      };
    }
    return {
      width: 1080,
      height: 1920,
      labelTr: '1080p Full HD (1080×1920)',
      shortLabel: '1080p',
      estBitrateMbps: activeFpsSpec.estBitrateMbps,
      estFileSizeMb: activeFpsSpec.estFileSizeMb,
      promptTagEn: '1080p Full HD resolution (1080x1920)',
    };
  }, [videoResolution, selectedFps, activeFpsSpec]);

  const activeDownloadFileName = useMemo(() => {
    const trimSuffix = isCustomTrimActive
      ? `-trim-${trimStart.toFixed(1)}s-${trimEnd.toFixed(1)}s`
      : '';
    return `vespera-video-${currentPackage.code.toLowerCase()}-${videoResolution}-${selectedFps}fps-${videoSpeed}x${trimSuffix}.${videoFileFormat}`;
  }, [
    currentPackage.code,
    videoResolution,
    selectedFps,
    videoSpeed,
    isCustomTrimActive,
    trimStart,
    trimEnd,
    videoFileFormat,
  ]);

  const handleResolutionToggle = (nextRes: '1080p' | '4k') => {
    setVideoResolution(nextRes);
    setVideoNativeWidth(nextRes === '4k' ? 2160 : 1080);
    setVideoNativeHeight(nextRes === '4k' ? 3840 : 1920);
  };

  const handleDownloadVideo = () => {
    const mimeType = videoFileFormat === 'webm' ? 'video/webm' : 'video/mp4';
    if (generatedVideoBlob) {
      const formattedBlob = new Blob([generatedVideoBlob], { type: mimeType });
      const downloadUrl = URL.createObjectURL(formattedBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = activeDownloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1500);
      return;
    }
    if (generatedVideoUrl) {
      const link = document.createElement('a');
      link.href = generatedVideoUrl;
      link.download = activeDownloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Baseline Visual Quality Score (0-100) & Missing Detail Warnings
  const baselineQualityAnalysis = useMemo(() => {
    return evaluateVisualQualityBaseline({
      videoPromptEn: currentPackage.videoPrompt.runwayEn,
      turnAngle,
      fps: selectedFps,
      cameraPathOptimized,
      verificationHeader,
      verificationDate,
      verificationWebsite,
      hasReferenceImage: Boolean(
        generatedVerifyImageUrl || customAnchorImageUrl || (anchorId && anchorId !== 'none')
      ),
    });
  }, [
    currentPackage.videoPrompt.runwayEn,
    turnAngle,
    selectedFps,
    cameraPathOptimized,
    verificationHeader,
    verificationDate,
    verificationWebsite,
    generatedVerifyImageUrl,
    customAnchorImageUrl,
    anchorId,
  ]);

  const activeQualityReport: VisualQualityAnalysis = aiQualityAnalysis || baselineQualityAnalysis;

  const batchReconciliationPlan = useMemo(() => {
    return buildBatchReconciliationPlan({
      hairId,
      wardrobeId,
      settingId,
      turnAngle,
      lightingMode,
      fps: selectedFps,
      videoSpeed,
      cameraPathOptimized,
      motionIntensity,
      advancedFilterId,
      keywordWeightBoost,
      verificationHeader,
      verificationDate,
      verificationWebsite,
      activeConflicts,
      currentQualityScore: activeQualityReport.overallScore,
    });
  }, [
    hairId,
    wardrobeId,
    settingId,
    turnAngle,
    lightingMode,
    selectedFps,
    videoSpeed,
    cameraPathOptimized,
    motionIntensity,
    advancedFilterId,
    keywordWeightBoost,
    verificationHeader,
    verificationDate,
    verificationWebsite,
    activeConflicts,
    activeQualityReport.overallScore,
  ]);

  const fiveConceptProgression = useMemo(() => {
    return evaluateFiveConceptQualityProgression({
      activeSettingId: settingId,
      activeLightingMode: lightingMode,
      activeScoreOverride: activeQualityReport.overallScore,
      hairId,
      wardrobeId,
      turnAngle,
      fps: selectedFps,
      videoSpeed,
      cameraPathOptimized,
      verificationHeader,
      verificationDate,
      verificationWebsite,
      hasReferenceImage: Boolean(
        generatedVerifyImageUrl || customAnchorImageUrl || (anchorId && anchorId !== 'none')
      ),
    });
  }, [
    settingId,
    lightingMode,
    activeQualityReport.overallScore,
    hairId,
    wardrobeId,
    turnAngle,
    selectedFps,
    videoSpeed,
    cameraPathOptimized,
    verificationHeader,
    verificationDate,
    verificationWebsite,
    generatedVerifyImageUrl,
    customAnchorImageUrl,
    anchorId,
  ]);

  const rebuildModelPromptsForOverride = (
    pkg: ContentPackage,
    opts: {
      settingId: string;
      lightingMode: LightingModeId;
      advancedFilterId: AdvancedPromptFilterId;
      keywordWeightBoost: KeywordWeightBoost;
      turnAngle: 'soft' | '180' | '360';
      fps: VideoFpsOption;
      videoSpeed: VideoSpeedOption;
      cameraPathOptimized: boolean;
      motionIntensity: number;
    }
  ): ContentPackage => {
    const decorateForPlatform = (txt: string, platform: VideoModelPlatform) =>
      enrichPromptWithModelJargon(
        applyAdvancedFilterToPromptEn(
          applyVideoSpeedToPromptEn(
            applyCameraPathToPromptEn(
              applyLightingHarmonyToPromptEn(
                applyFpsToPromptEn(txt, opts.fps),
                opts.settingId,
                opts.lightingMode
              ),
              opts.turnAngle,
              opts.fps,
              opts.cameraPathOptimized
            ),
            opts.videoSpeed
          ),
          opts.advancedFilterId,
          opts.keywordWeightBoost
        ),
        platform,
        {
          turnAngle: opts.turnAngle,
          fps: opts.fps,
          videoSpeed: opts.videoSpeed,
          motionIntensity: opts.motionIntensity,
        }
      );

    const nextRunway = decorateForPlatform(pkg.videoPrompt.runwayEn, 'runway');
    const nextKling = decorateForPlatform(pkg.videoPrompt.klingEn, 'kling');
    const nextLuma = decorateForPlatform(pkg.videoPrompt.lumaEn, 'luma');

    return {
      ...pkg,
      settingId: opts.settingId,
      lightingMode: opts.lightingMode,
      advancedFilterId: opts.advancedFilterId,
      keywordWeightBoost: opts.keywordWeightBoost,
      turnAngle: opts.turnAngle,
      fps: opts.fps,
      videoSpeed: opts.videoSpeed,
      cameraPathOptimized: opts.cameraPathOptimized,
      motionIntensity: opts.motionIntensity,
      videoPrompt: {
        ...pkg.videoPrompt,
        masterEn: nextRunway,
        runwayEn: nextRunway,
        klingEn: nextKling,
        lumaEn: nextLuma,
        compressedMasterEn: compressVideoPromptLocal(nextRunway),
        compressedRunwayEn: compressVideoPromptLocal(nextRunway),
        compressedKlingEn: compressVideoPromptLocal(nextKling),
        compressedLumaEn: compressVideoPromptLocal(nextLuma),
        scenarioTr: applyAdvancedFilterToScenarioTr(
          applyVideoSpeedToScenarioTr(
            applyCameraPathToScenarioTr(
              applyLightingHarmonyToScenarioTr(
                applyFpsToScenarioTr(pkg.videoPrompt.scenarioTr, opts.fps),
                opts.settingId,
                opts.lightingMode
              ),
              opts.turnAngle,
              opts.fps,
              opts.cameraPathOptimized
            ),
            opts.videoSpeed
          ),
          opts.advancedFilterId,
          opts.keywordWeightBoost
        ),
      },
      verificationPhotoPrompt: {
        ...pkg.verificationPhotoPrompt,
        midjourneyEn: applyAdvancedFilterToPromptEn(
          pkg.verificationPhotoPrompt.midjourneyEn,
          opts.advancedFilterId,
          opts.keywordWeightBoost
        ),
        dalleEn: applyAdvancedFilterToPromptEn(
          pkg.verificationPhotoPrompt.dalleEn,
          opts.advancedFilterId,
          opts.keywordWeightBoost
        ),
        descriptionTr: applyAdvancedFilterToScenarioTr(
          pkg.verificationPhotoPrompt.descriptionTr,
          opts.advancedFilterId,
          opts.keywordWeightBoost
        ),
      },
    };
  };

  const handleAdvancedFilterChange = (nextFilter: AdvancedPromptFilterId) => {
    setAdvancedFilterId(nextFilter);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId: nextFilter,
            keywordWeightBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleKeywordWeightBoostChange = (nextBoost: KeywordWeightBoost) => {
    setKeywordWeightBoost(nextBoost);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost: nextBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleSettingChange = (nextSettingId: string) => {
    setAiOverridePackage(null);
    setAiQualityAnalysis(null);
    setResolvedConflictMap({});
    setSettingId(nextSettingId);
    if (autoSyncLightingWithRoom) {
      setLightingMode(getDefaultLightingModeForSetting(nextSettingId));
    }
  };

  const handleLightingModeChange = (nextMode: LightingModeId, keepAutoSync = false) => {
    setLightingMode(nextMode);
    if (!keepAutoSync) {
      setAutoSyncLightingWithRoom(nextMode === getDefaultLightingModeForSetting(settingId));
    }
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode: nextMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleFpsToggle = (nextFps: VideoFpsOption) => {
    setSelectedFps(nextFps);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle,
            fps: nextFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleVideoSpeedChange = (nextSpeed: VideoSpeedOption) => {
    setVideoSpeed(nextSpeed);
    setAiQualityAnalysis(null);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed: nextSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleMotionIntensityChange = (nextIntensity: number) => {
    setMotionIntensity(nextIntensity);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity: nextIntensity,
          })
        : null
    );
  };

  const handleTurnAngleChange = (nextAngle: 'soft' | '180' | '360') => {
    setTurnAngle(nextAngle);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle: nextAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleCameraPathToggle = (nextOptimized: boolean) => {
    setCameraPathOptimized(nextOptimized);
    setAiQualityAnalysis(null);
    setAiOverridePackage((prev) =>
      prev
        ? rebuildModelPromptsForOverride(prev, {
            settingId,
            lightingMode,
            advancedFilterId,
            keywordWeightBoost,
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            cameraPathOptimized: nextOptimized,
            motionIntensity,
          })
        : null
    );
  };

  const handleRunAiQualityAnalysis = async (overridePrompt?: string) => {
    if (isAnalyzingQuality) return;
    setIsAnalyzingQuality(true);
    setQualityAnalysisError(null);
    try {
      const refImage = generatedVerifyImageUrl || customAnchorImageUrl || '';
      const response = await fetch('/api/analyze-video-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoPromptEn: overridePrompt || currentPackage.videoPrompt.runwayEn,
          scenarioTr: currentPackage.videoPrompt.scenarioTr,
          turnAngle,
          fps: selectedFps,
          cameraPathOptimized,
          verificationHeader,
          verificationDate,
          verificationWebsite,
          frameDataUrl: refImage,
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Görsel kalite analizi tamamlanamadı.');
      }
      setAiQualityAnalysis({
        overallScore: Number(data.overallScore) || baselineQualityAnalysis.overallScore,
        skinNaturalnessScore:
          Number(data.skinNaturalnessScore) || baselineQualityAnalysis.skinNaturalnessScore,
        phoneFlashRealismScore:
          Number(data.phoneFlashRealismScore) || baselineQualityAnalysis.phoneFlashRealismScore,
        verificationCardScore:
          Number(data.verificationCardScore) || baselineQualityAnalysis.verificationCardScore,
        cameraPathMotionScore:
          Number(data.cameraPathMotionScore) || baselineQualityAnalysis.cameraPathMotionScore,
        summaryTr: data.summaryTr || baselineQualityAnalysis.summaryTr,
        missingDetails: Array.isArray(data.missingDetails)
          ? data.missingDetails.map(
              (item: {
                id?: string;
                titleTr?: string;
                descriptionTr?: string;
                actionLabelTr?: string;
                snippetEn?: string;
              }) => ({
                id: item.id || `ai-warn-${Math.random().toString(36).slice(2, 6)}`,
                titleTr: item.titleTr || 'Eksik Detay Uyarısı',
                descriptionTr: item.descriptionTr || '',
                actionLabelTr: item.actionLabelTr || 'Detayı Prompt’a Ekle',
                fixType: 'inject_prompt_detail' as const,
                snippetEn: item.snippetEn || '',
              })
            )
          : baselineQualityAnalysis.missingDetails,
        isAiAnalyzed: true,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kalite analizi sırasında hata oluştu.';
      setQualityAnalysisError(msg);
    } finally {
      setIsAnalyzingQuality(false);
    }
  };

  const handleQuickFixWarning = (warn: MissingDetailWarning) => {
    setAiQualityAnalysis(null);
    if (warn.fixType === 'enable_camera_path') {
      handleCameraPathToggle(true);
      return;
    }
    if (warn.fixType === 'switch_fps_60') {
      handleFpsToggle(60);
      return;
    }
    if (warn.fixType === 'fill_line3') {
      if (!verificationHeader.trim()) setVerificationHeader('VERIFIED');
      if (!verificationDate.trim()) setVerificationDate('04.10.2026');
      if (!verificationWebsite.trim()) setVerificationWebsite('vespera.studio');
      return;
    }
    if (warn.fixType === 'inject_prompt_detail' && warn.snippetEn) {
      const snippet = warn.snippetEn.trim();
      const injectSnippet = (txt: string) => {
        if (txt.toLowerCase().includes(snippet.toLowerCase())) return txt;
        const noSplit = txt.split(/\s+--no\s+/i);
        const body = noSplit[0].trim().replace(/\.$/, '');
        const neg = noSplit[1] ? ` --no ${noSplit[1].trim()}` : '';
        return `${body}, ${snippet}.${neg}`;
      };
      const basePkg = aiOverridePackage || compiledPackage;
      const nextRunway = injectSnippet(basePkg.videoPrompt.runwayEn);
      const nextKling = injectSnippet(basePkg.videoPrompt.klingEn);
      const nextLuma = injectSnippet(basePkg.videoPrompt.lumaEn);
      setAiOverridePackage({
        ...basePkg,
        videoPrompt: {
          ...basePkg.videoPrompt,
          masterEn: nextRunway,
          runwayEn: nextRunway,
          klingEn: nextKling,
          lumaEn: nextLuma,
          compressedMasterEn: compressVideoPromptLocal(nextRunway),
          compressedRunwayEn: compressVideoPromptLocal(nextRunway),
          compressedKlingEn: compressVideoPromptLocal(nextKling),
          compressedLumaEn: compressVideoPromptLocal(nextLuma),
        },
      });
      return;
    }
    handleCameraPathToggle(true);
  };

  const handleResolveConflict = (
    conflict: PromptConflictWarning,
    resolution: PromptConflictResolutionOption
  ) => {
    setAiOverridePackage(null);
    setAiQualityAnalysis(null);

    if (resolution.actionType === 'change_hair' && resolution.targetValue) {
      handleHairChange(resolution.targetValue);
      setConflictNoticeTr(`Çakışma çözüldü: ${resolution.labelTr} uygulandı.`);
    } else if (resolution.actionType === 'change_wardrobe' && resolution.targetValue) {
      setWardrobeId(resolution.targetValue);
      setConflictNoticeTr(`Çakışma çözüldü: ${resolution.labelTr} uygulandı.`);
    } else if (resolution.actionType === 'change_setting' && resolution.targetValue) {
      handleSettingChange(resolution.targetValue);
      setConflictNoticeTr(`Çakışma çözüldü: ${resolution.labelTr} uygulandı.`);
    } else if (resolution.actionType === 'change_turn' && resolution.targetValue) {
      setTurnAngle(resolution.targetValue as 'soft' | '180' | '360');
      setConflictNoticeTr(`Çakışma çözüldü: ${resolution.labelTr} uygulandı.`);
    } else {
      setResolvedConflictMap((prev) => ({
        ...prev,
        [conflict.id]: {
          patchEn: conflict.harmonyPatchEn,
          patchTr: conflict.harmonyPatchTr,
          titleTr: conflict.categoryTr,
        },
      }));
      setConflictNoticeTr(
        `Çakışma prompt içinde uzlaştırıldı: "${conflict.categoryTr}" için koruma direktifi eklendi.`
      );
    }

    setTimeout(() => {
      setConflictNoticeTr(null);
    }, 4000);
  };

  const handleResolveAllConflicts = () => {
    if (activeConflicts.length === 0) return;
    setAiOverridePackage(null);
    setAiQualityAnalysis(null);
    setResolvedConflictMap((prev) => {
      const next = { ...prev };
      for (const c of activeConflicts) {
        next[c.id] = {
          patchEn: c.harmonyPatchEn,
          patchTr: c.harmonyPatchTr,
          titleTr: c.categoryTr,
        };
      }
      // Also store the unified batch synthesis token
      next['__batch_reconciliation_master__'] = {
        patchEn: batchReconciliationPlan.unifiedHarmonyPatchEn,
        patchTr: batchReconciliationPlan.unifiedHarmonyPatchTr,
        titleTr: 'Toplu Uzlaştırma Sentezi',
      };
      return next;
    });
    setConflictNoticeTr(
      `Toplu Uzlaştırma tamamlandı: Tüm (${activeConflicts.length}) çakışma tek bir birleşik koruma direktifinde uzlaştırıldı.`
    );
    setTimeout(() => {
      setConflictNoticeTr(null);
    }, 4500);
  };

  const handleRunQuickRepairWizard = (modeOverride?: 'harmony_keep' | 'smart_preset') => {
    const modeToUse = modeOverride || quickRepairMode;
    setPreviousConfigSnapshot({
      hairId,
      wardrobeId,
      settingId,
      turnAngle,
      lightingMode,
      selectedFps,
      cameraPathOptimized,
      motionIntensity,
      keywordWeightBoost,
      verificationHeader,
      verificationDate,
      verificationWebsite,
      resolvedConflictMap: { ...resolvedConflictMap },
    });

    setAiOverridePackage(null);
    setAiQualityAnalysis(null);

    const target = batchReconciliationPlan.smartPresetTarget;
    const appliedLog: string[] = [];

    if (modeToUse === 'harmony_keep') {
      // Mode 1: Keep creative selections (Hair, Wardrobe, Room) + apply Unified Batch Reconciliation + calibrate technical settings
      const nextMap: Record<string, { patchEn: string; patchTr: string; titleTr: string }> = {
        ...resolvedConflictMap,
      };
      for (const c of activeConflicts) {
        nextMap[c.id] = {
          patchEn: c.harmonyPatchEn,
          patchTr: c.harmonyPatchTr,
          titleTr: c.categoryTr,
        };
      }
      nextMap['__batch_reconciliation_master__'] = {
        patchEn: batchReconciliationPlan.unifiedHarmonyPatchEn,
        patchTr: batchReconciliationPlan.unifiedHarmonyPatchTr,
        titleTr: 'Toplu Uzlaştırma Sentezi',
      };
      setResolvedConflictMap(nextMap);

      if (activeConflicts.length > 0) {
        appliedLog.push(
          `${activeConflicts.length} adet saç/kıyafet/ortam çakışması Toplu Uzlaştırma Direktifi ile tek adımda çözüldü`
        );
      } else {
        appliedLog.push('Birleşik Stüdyo Uyum Kilidi (15° açılı flaş & yaka ayrımı) prompta işlendi');
      }

      if (lightingMode !== target.lightingMode) {
        setLightingMode(target.lightingMode);
        setAutoSyncLightingWithRoom(true);
        const recLight =
          LIGHTING_MODE_OPTIONS.find((l) => l.id === target.lightingMode)?.shortLabelTr || 'Doğal';
        appliedLog.push(`Ev ortamıyla tam uyum için Işık Modu "${recLight}" olarak senkronize edildi`);
      }

      if (selectedFps !== target.fps) {
        setSelectedFps(target.fps);
        appliedLog.push(`Dönüş akıcılığı için kare hızı ${target.fps} FPS seviyesine yükseltildi`);
      }

      if (!cameraPathOptimized) {
        setCameraPathOptimized(true);
        appliedLog.push('Kamera Yolu Optimizasyonu (Faz 1-2-3 Zamanlamalı Akış) aktif edildi');
      }

      if (motionIntensity !== target.motionIntensity) {
        setMotionIntensity(target.motionIntensity);
        appliedLog.push('Hareket yoğunluğu 0.30 (3/10 Yüz & Kağıt Koruma) seviyesine kalibre edildi');
      }

      if (keywordWeightBoost !== target.keywordWeightBoost) {
        setKeywordWeightBoost(target.keywordWeightBoost);
        appliedLog.push('Anahtar kelime ağırlığı Güçlü (:1.30–1.35) çarpanına yükseltildi');
      }

      if (
        !verificationHeader.trim() ||
        !verificationDate.trim() ||
        !verificationWebsite.trim()
      ) {
        setVerificationHeader(target.verificationHeader);
        setVerificationDate(target.verificationDate);
        setVerificationWebsite(target.verificationWebsite);
        appliedLog.push('3 satırlı doğrulama kağıdındaki eksik metin alanları tamamlandı');
      }

      setQuickRepairAppliedLog(appliedLog);
      setConflictNoticeTr(
        `Hızlı Onarım Sihirbazı (Seçimleri Koru + Toplu Uzlaştırma) tamamlandı · Tahmini Kalite: ${batchReconciliationPlan.estimatedScoreAfterHarmony}/100`
      );
    } else {
      // Mode 2: Full Smart Preset Replacement + Zero-Conflict Auto-Optimization
      setResolvedConflictMap({});
      setHairId(target.hairId);
      if (!customAnchorImageUrl) {
        const matchingAnchor = ANCHOR_IMAGE_PRESETS.find((a) => a.hairId === target.hairId);
        setAnchorId(matchingAnchor ? matchingAnchor.id : 'none');
      }
      setWardrobeId(target.wardrobeId);
      setSettingId(target.settingId);
      setLightingMode(target.lightingMode);
      setAutoSyncLightingWithRoom(true);
      setSelectedFps(target.fps);
      setCameraPathOptimized(true);
      setMotionIntensity(target.motionIntensity);
      setKeywordWeightBoost(target.keywordWeightBoost);
      setVerificationHeader(target.verificationHeader);
      setVerificationDate(target.verificationDate);
      setVerificationWebsite(target.verificationWebsite);

      setQuickRepairAppliedLog(target.changesMadeTr);
      setConflictNoticeTr(
        `Hızlı Onarım Sihirbazı (Tam Otomatik Konfigürasyon Onarımı) uygulandı · 0 Çakışma · Kalite: ${batchReconciliationPlan.estimatedScoreAfterSmartPreset}/100`
      );
    }

    setTimeout(() => {
      setConflictNoticeTr(null);
    }, 5000);
  };

  const handleUndoQuickRepair = () => {
    if (!previousConfigSnapshot) return;
    setAiOverridePackage(null);
    setAiQualityAnalysis(null);
    setHairId(previousConfigSnapshot.hairId);
    setWardrobeId(previousConfigSnapshot.wardrobeId);
    setSettingId(previousConfigSnapshot.settingId);
    setTurnAngle(previousConfigSnapshot.turnAngle);
    setLightingMode(previousConfigSnapshot.lightingMode);
    setSelectedFps(previousConfigSnapshot.selectedFps);
    setCameraPathOptimized(previousConfigSnapshot.cameraPathOptimized);
    setMotionIntensity(previousConfigSnapshot.motionIntensity);
    setKeywordWeightBoost(previousConfigSnapshot.keywordWeightBoost);
    setVerificationHeader(previousConfigSnapshot.verificationHeader);
    setVerificationDate(previousConfigSnapshot.verificationDate);
    setVerificationWebsite(previousConfigSnapshot.verificationWebsite);
    setResolvedConflictMap(previousConfigSnapshot.resolvedConflictMap);
    setPreviousConfigSnapshot(null);
    setQuickRepairAppliedLog([]);
    setConflictNoticeTr('Hızlı Onarım geri alındı; önceki konfigürasyona dönüldü.');
    setTimeout(() => {
      setConflictNoticeTr(null);
    }, 3500);
  };

  const handleLoadSampleMultiConflictScenario = () => {
    setAiOverridePackage(null);
    setAiQualityAnalysis(null);
    setResolvedConflictMap({});
    setQuickRepairAppliedLog([]);
    // Set a 3-way conflict scenario: Long Platinum Blonde + Emerald Halter Lace + Bathroom Mirror + 360 Spin + 24 FPS + Dramatik Light
    setHairId('platinum-waves-roots');
    setWardrobeId('emerald-halter-lace-cuff');
    setSettingId('italian-marble-bathroom');
    setTurnAngle('360');
    setSelectedFps(24);
    setLightingMode('dramatik');
    setAutoSyncLightingWithRoom(false);
    setCameraPathOptimized(false);
    setShowQuickRepairWizard(true);
    setConflictNoticeTr(
      'Örnek çoklu çakışma senaryosu yüklendi: "Toplu Uzlaştırma" veya "Hızlı Onarım Sihirbazı" ile tek seferde optimize edebilirsiniz.'
    );
    setTimeout(() => {
      setConflictNoticeTr(null);
    }, 4500);
  };

  const handleHairChange = (selectedHairId: string) => {
    setAiOverridePackage(null);
    setResolvedConflictMap({});
    setHairId(selectedHairId);
    if (!customAnchorImageUrl) {
      const matchingAnchor = ANCHOR_IMAGE_PRESETS.find((a) => a.hairId === selectedHairId);
      setAnchorId(matchingAnchor ? matchingAnchor.id : 'none');
    }
  };

  const handleAnchorFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAiOverridePackage(null);
    setAnchorId('custom-upload');
    setCustomAnchorFileName(file.name);
    const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    setCustomAnchorDescEn(
      `24-year-old female model from uploaded reference "${baseName}" with non-porcelain unretouched skin, slight natural skin imperfections, natural human skin texture, shot on smartphone camera with direct flash in an everyday home environment`
    );
    setCustomAnchorDescTr(
      `Yüklenen "${file.name}" referans görselindeki porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip model`
    );
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomAnchorImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearUploadedAnchor = () => {
    setCustomAnchorImageUrl('');
    setCustomAnchorFileName('');
    setCustomAnchorDescEn('');
    setCustomAnchorDescTr('');
    setAnchorId('anchor-elena-nordic');
  };

  const handleRandomNewPackage = () => {
    setAiOverridePackage(null);
    setAiError(null);
    const pickDifferent = <T extends { id: string }>(list: T[], currentId: string): string => {
      const filtered = list.filter((item) => item.id !== currentId);
      const pool = filtered.length > 0 ? filtered : list;
      return pool[Math.floor(Math.random() * pool.length)].id;
    };
    const nextHair = pickDifferent(HAIR_OPTIONS, hairId);
    const nextSetting = pickDifferent(SETTING_OPTIONS, settingId);
    handleHairChange(nextHair);
    setWardrobeId((prev) => pickDifferent(WARDROBE_OPTIONS, prev));
    handleSettingChange(nextSetting);
    setTurnAngle('soft');
    setPkgCounter((prev) => prev + 1);
    setActiveSection('studio');
  };

  const handleGenerateAiPackage = async () => {
    setIsGeneratingAi(true);
    setAiError(null);

    const anchorOpt = ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId);
    const hairOpt = HAIR_OPTIONS.find((h) => h.id === hairId);
    const wardOpt = WARDROBE_OPTIONS.find((w) => w.id === wardrobeId);
    const setOpt = SETTING_OPTIONS.find((s) => s.id === settingId);
    const cardStyleOpt = VERIFICATION_CARD_STYLES[0];
    const camOpt = CAMERA_SPEED_OPTIONS[0];
    const lightOpt = LIGHTING_MOOD_OPTIONS.find((l) => l.id === lightingMoodId);

    try {
      const response = await fetch('/api/generate-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationHeader,
          verificationDate,
          verificationWebsite,
          verificationCardStyle: cardStyleOpt?.promptEn,
          anchorCharacterEn: customAnchorDescEn.trim() || anchorOpt?.faceAndSkinEn || '',
          anchorCharacterTr: customAnchorDescTr.trim() || anchorOpt?.faceAndSkinTr || '',
          hairInput: hairOpt?.promptEn,
          outfitInput: wardOpt?.promptEn,
          settingInput: setOpt?.promptEn,
          turnAngle,
          fps: selectedFps,
          videoSpeed,
          lightingMode,
          advancedFilterId,
          keywordWeightBoost,
          autoLightingPromptEn: activeLightingHarmony.autoLightingPromptEn,
          advancedFilterDirectiveEn: activeFilterSpec.filterDirectiveEn,
          cameraPathOptimized,
          motionIntensity,
          cameraSpeed: camOpt?.promptEn,
          lightingMood: lightOpt?.promptEn,
          globalNegativePrompt,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'AI paket üretimi başarısız oldu.');
      }

      const nextCount = pkgCounter + 1;
      setPkgCounter(nextCount);

      const negClean = globalNegativePrompt.replace(/^--no\s+/i, '').trim();
      const ensureNoSuffix = (txt: string) => {
        if (!negClean) return txt;
        if (txt.includes('--no ')) return txt;
        return `${txt.trim()} --no ${negClean}`;
      };

      const decorateVideoPrompt = (rawPrompt: string, platform: VideoModelPlatform) =>
        enrichPromptWithModelJargon(
          applyAdvancedFilterToPromptEn(
            applyVideoSpeedToPromptEn(
              applyCameraPathToPromptEn(
                applyLightingHarmonyToPromptEn(
                  applyFpsToPromptEn(ensureNoSuffix(rawPrompt), selectedFps),
                  settingId,
                  lightingMode
                ),
                turnAngle,
                selectedFps,
                cameraPathOptimized
              ),
              videoSpeed
            ),
            advancedFilterId,
            keywordWeightBoost
          ),
          platform,
          {
            turnAngle,
            fps: selectedFps,
            videoSpeed,
            motionIntensity,
          }
        );

      const runwayFull = decorateVideoPrompt(
        data.videoPrompt?.runwayEn || compiledPackage.videoPrompt.runwayEn,
        'runway'
      );
      const klingFull = decorateVideoPrompt(
        data.videoPrompt?.klingEn || compiledPackage.videoPrompt.klingEn,
        'kling'
      );
      const lumaFull = decorateVideoPrompt(
        data.videoPrompt?.lumaEn || compiledPackage.videoPrompt.lumaEn,
        'luma'
      );

      const newAiPkg: ContentPackage = {
        ...compiledPackage,
        id: `ai-pkg-${Date.now()}`,
        code: `AI-${String(nextCount).padStart(2, '0')}`,
        fps: selectedFps,
        videoSpeed,
        lightingMode,
        advancedFilterId,
        keywordWeightBoost,
        cameraPathOptimized,
        packageTitleTr: data.packageTitleTr || compiledPackage.packageTitleTr,
        characterAnchorEn: data.characterAnchorEn || compiledPackage.characterAnchorEn,
        characterAnchorTr: data.characterAnchorTr || compiledPackage.characterAnchorTr,
        videoPrompt: {
          masterEn: runwayFull,
          runwayEn: runwayFull,
          klingEn: klingFull,
          lumaEn: lumaFull,
          compressedMasterEn: compressVideoPromptLocal(runwayFull),
          compressedRunwayEn: compressVideoPromptLocal(runwayFull),
          compressedKlingEn: compressVideoPromptLocal(klingFull),
          compressedLumaEn: compressVideoPromptLocal(lumaFull),
          negativeEn: negClean,
          scenarioTr: applyAdvancedFilterToScenarioTr(
            applyVideoSpeedToScenarioTr(
              applyCameraPathToScenarioTr(
                applyLightingHarmonyToScenarioTr(
                  applyFpsToScenarioTr(
                    data.videoPrompt?.scenarioTr || compiledPackage.videoPrompt.scenarioTr,
                    selectedFps
                  ),
                  settingId,
                  lightingMode
                ),
                turnAngle,
                selectedFps,
                cameraPathOptimized
              ),
              videoSpeed
            ),
            advancedFilterId,
            keywordWeightBoost
          ),
        },
        verificationPhotoPrompt: {
          midjourneyEn: applyAdvancedFilterToPromptEn(
            ensureNoSuffix(
              data.verificationPhotoPrompt?.midjourneyEn ||
                compiledPackage.verificationPhotoPrompt.midjourneyEn
            ),
            advancedFilterId,
            keywordWeightBoost
          ),
          dalleEn: applyAdvancedFilterToPromptEn(
            ensureNoSuffix(
              data.verificationPhotoPrompt?.dalleEn ||
                compiledPackage.verificationPhotoPrompt.dalleEn
            ),
            advancedFilterId,
            keywordWeightBoost
          ),
          descriptionTr: applyAdvancedFilterToScenarioTr(
            data.verificationPhotoPrompt?.descriptionTr ||
              compiledPackage.verificationPhotoPrompt.descriptionTr,
            advancedFilterId,
            keywordWeightBoost
          ),
        },
        galleryPrompts:
          Array.isArray(data.galleryPrompts) && data.galleryPrompts.length >= 5
            ? data.galleryPrompts.map(
                (g: {
                  poseNumber: number;
                  poseTitleTr: string;
                  poseTitleEn: string;
                  promptEn: string;
                  descriptionTr: string;
                }) => ({
                  ...g,
                  promptEn: ensureNoSuffix(g.promptEn),
                })
              )
            : compiledPackage.galleryPrompts,
        createdAt: 'AI Özel Sentez Paketi',
        isAiGenerated: true,
      };

      setAiOverridePackage(newAiPkg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sunucu bağlantısında hata oluştu.';
      setAiError(msg);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleGenerateVerifyPhoto = async () => {
    setIsGeneratingVerifyImage(true);
    setVerifyImageError(null);
    setVerifyImageProgress(20);

    const timer = setInterval(() => {
      setVerifyImageProgress((prev) => Math.min(90, prev + 15));
    }, 450);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentPackage.verificationPhotoPrompt.midjourneyEn,
          model: 'gemini-nano-banana-2.1',
          imageSize: '2K',
          referenceImageDataUrl: customAnchorImageUrl || '',
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Doğrulama görseli üretilemedi.');
      }
      setVerifyImageProgress(100);
      setGeneratedVerifyImageUrl(data.imageUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Görsel üretiminde hata oluştu.';
      setVerifyImageError(msg);
    } finally {
      clearInterval(timer);
      setTimeout(() => {
        setIsGeneratingVerifyImage(false);
        setVerifyImageProgress(0);
      }, 300);
    }
  };

  const handleGenerateVeoVideo = async () => {
    if (isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setVideoGenError(null);
    setVideoGenProgress(15);
    setVideoGenStageText('Veo 3.1 Pro Başlatılıyor...');

    try {
      const refImage = generatedVerifyImageUrl || customAnchorImageUrl || '';

      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentPackage.videoPrompt.runwayEn,
          model: 'veo-3.1-generate-preview',
          resolution: videoResolution === '4k' ? '1080p' : '1080p',
          referenceImageDataUrl: refImage,
        }),
      });

      const startData = await startRes.json();
      if (!startRes.ok || startData.error || !startData.operationName) {
        throw new Error(startData.error || 'Video üretimi başlatılamadı.');
      }

      const operationName: string = startData.operationName;
      let isDone = false;
      let pollCount = 0;

      while (!isDone && pollCount < 90) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        pollCount += 1;
        setVideoGenProgress((prev) => Math.min(92, prev + 7));
        setVideoGenStageText('9:16 Dikey Video İşleniyor...');

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });
        const statusData = await statusRes.json();
        if (!statusRes.ok || statusData.error) {
          throw new Error(statusData.error || 'Video durumu alınamadı.');
        }
        if (statusData.done) {
          isDone = true;
        }
      }

      if (!isDone) {
        throw new Error('Video üretimi zaman aşımına uğradı.');
      }

      setVideoGenProgress(96);
      setVideoGenStageText('Video İndiriliyor...');

      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
      });

      if (!downloadRes.ok) {
        throw new Error('Üretilen video indirilemedi.');
      }

      const videoBlob = await downloadRes.blob();
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      setGeneratedVideoBlob(videoBlob);
      setGeneratedVideoSizeBytes(videoBlob.size);
      setGeneratedVideoUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return videoObjectUrl;
      });
      setVideoGenProgress(100);
      // Automatically run AI quality inspection on the generated video configuration
      handleRunAiQualityAnalysis(currentPackage.videoPrompt.runwayEn);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Video üretimi sırasında hata oluştu.';
      setVideoGenError(msg);
    } finally {
      setTimeout(() => {
        setIsGeneratingVideo(false);
        setVideoGenProgress(0);
      }, 300);
    }
  };

  const handleGenerateGalleryPoseImage = async (poseNumber: number, promptText: string) => {
    setGalleryImageError(null);
    setGeneratingPoseNumbers((prev) => (prev.includes(poseNumber) ? prev : [...prev, poseNumber]));

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          model: 'gemini-nano-banana-2.1',
          imageSize: '2K',
          referenceImageDataUrl: generatedVerifyImageUrl || customAnchorImageUrl || '',
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || `Poz #${poseNumber} üretilemedi.`);
      }
      setGeneratedGalleryImages((prev) => ({
        ...prev,
        [poseNumber]: data.imageUrl,
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Galeri görseli üretilirken hata oluştu.';
      setGalleryImageError(msg);
    } finally {
      setGeneratingPoseNumbers((prev) => prev.filter((n) => n !== poseNumber));
    }
  };

  const handleGenerateAllSixGalleryImages = async () => {
    if (isGeneratingAllGallery) return;
    setIsGeneratingAllGallery(true);
    setGalleryImageError(null);
    try {
      for (const pose of currentPackage.galleryPrompts) {
        await handleGenerateGalleryPoseImage(pose.poseNumber, pose.promptEn);
      }
    } finally {
      setIsGeneratingAllGallery(false);
    }
  };

  const handleCopyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedTarget(key);
    setTimeout(() => {
      setCopiedTarget((prev) => (prev === key ? null : prev));
    }, 1800);
  };

  const handleSaveCurrentPackage = () => {
    const toSave: ContentPackage = {
      ...currentPackage,
      id: `saved-${Date.now()}`,
      createdAt: new Date().toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSavedPackages((prev) => [toSave, ...prev]);
    setCopiedTarget('saved-pkg');
    setTimeout(() => setCopiedTarget(null), 1600);
  };

  const handleExportSaved = (format: 'json' | 'csv') => {
    const content =
      format === 'json'
        ? formatPackagesAsJson(savedPackages)
        : '\uFEFF' + formatPackagesAsCsv(savedPackages);
    const blob = new Blob([content], {
      type: format === 'json' ? 'application/json;charset=utf-8' : 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vespera-paketler.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    vid.playbackRate = videoSpeed;
    if (vid.videoWidth && vid.videoHeight) {
      setVideoNativeWidth(vid.videoWidth);
      setVideoNativeHeight(vid.videoHeight);
    }
    const dur =
      Number.isFinite(vid.duration) && vid.duration > 0 ? Number(vid.duration.toFixed(1)) : 8.0;
    setVideoDuration(dur);
    setTrimStart(0);
    setTrimEnd(dur);
    setPlayheadTime(0);
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.currentTime < trimStart) {
      vid.currentTime = trimStart;
      setPlayheadTime(trimStart);
    } else if (vid.currentTime >= trimEnd) {
      if (isLoopEnabled) {
        vid.currentTime = trimStart;
        setPlayheadTime(trimStart);
        vid.play().catch(() => {});
      } else {
        vid.pause();
        setPlayheadTime(trimEnd);
      }
    } else {
      setPlayheadTime(Number(vid.currentTime.toFixed(2)));
    }
  };

  const activePreviewImg =
    generatedVerifyImageUrl || customAnchorImageUrl || currentPackage.previewImage;

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#F5F2EB] flex flex-col">
      {/* Modern Architectural Studio Header + Theme Switcher */}
      <header className="sticky top-0 z-30 bg-[#0B0A09]/95 backdrop-blur-md border-b border-[#D4A359]/25">
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="#studio"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('studio');
              }}
              className="font-display text-2xl font-bold tracking-tight text-[#F5F2EB] flex items-center gap-2"
            >
              <span>Vespera</span>
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                9:16 STUDIO
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveSection('studio')}
                className={`py-1 border-b-2 transition-colors cursor-pointer ${
                  activeSection === 'studio'
                    ? 'border-[#D4A359] text-[#D4A359]'
                    : 'border-transparent text-[#F5F2EB]/65 hover:text-[#F5F2EB]'
                }`}
              >
                Kurgu &amp; Prompt Stüdyosu
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('saved')}
                className={`py-1 border-b-2 transition-colors cursor-pointer ${
                  activeSection === 'saved'
                    ? 'border-[#D4A359] text-[#D4A359]'
                    : 'border-transparent text-[#F5F2EB]/65 hover:text-[#F5F2EB]'
                }`}
              >
                Kayıtlı Arşiv ({savedPackages.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            {/* 3-Way Studio Theme Switcher */}
            {/* 3-Way Studio Theme Switcher */}
            <div
              role="group"
              aria-label="Stüdyo Teması Seçici"
              className="inline-flex items-center border border-[#D4A359]/35 rounded-lg overflow-hidden p-0.5 bg-[#0B0A09]"
            >
              <Palette className="w-3.5 h-3.5 text-[#D4A359] ml-2 mr-1.5 shrink-0" />
              {(
                [
                  { id: 'cinematic-dark', label: 'Sinematik' },
                  { id: 'clean-light', label: 'Aydınlık' },
                  { id: 'midnight-slate', label: 'Gece Mavisi' },
                ] as const
              ).map((thm) => {
                const isActive = studioTheme === thm.id;
                return (
                  <button
                    key={thm.id}
                    type="button"
                    onClick={() => setStudioTheme(thm.id)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#D4A359] text-[#0B0A09]'
                        : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                    }`}
                  >
                    {thm.label}
                  </button>
                );
              })}
            </div>

            {/* Studio View Mode Switcher */}
            <div
              role="group"
              aria-label="Görünüm Modu"
              className="hidden lg:inline-flex items-center border border-[#D4A359]/35 rounded-lg overflow-hidden p-0.5 bg-[#0B0A09]"
            >
              <button
                type="button"
                onClick={() => setStudioViewMode('simple')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors ${
                  studioViewMode === 'simple'
                    ? 'bg-[#D4A359] text-[#0B0A09]'
                    : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                }`}
                title="Sadeleştirilmiş, anlaşılır ve hızlı mod"
              >
                <Sparkles className="w-3 h-3" />
                <span>Sade Mod</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioViewMode('full')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors ${
                  studioViewMode === 'full'
                    ? 'bg-[#D4A359] text-[#0B0A09]'
                    : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                }`}
                title="Tüm kurgu araçlarını gösteren tam stüdyo modu"
              >
                <Layers className="w-3 h-3" />
                <span>Gelişmiş Mod</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveCurrentPackage}
              className="px-3.5 py-2 text-xs font-semibold text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedTarget === 'saved-pkg' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Kaydedildi</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Paketi Kaydet</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRandomNewPackage}
              className="px-4 py-2 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Yeni Konsept</span>
            </button>
          </div>
        </div>

        {/* Sticky Quick-Jump Workflow Bar & Live Studio Telemetry */}
        <div className="border-t border-[#D4A359]/15 bg-[#0B0A09]/90">
          <div className="max-w-[1260px] mx-auto px-6 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#F5F2EB]/55 mr-1">Hızlı Geçiş:</span>
              <button
                type="button"
                onClick={() => scrollToStudioSection('step-01-concept')}
                className="px-2.5 py-1 rounded border border-[#D4A359]/25 text-[#F5F2EB]/80 hover:border-[#D4A359] hover:text-[#D4A359] transition-colors cursor-pointer"
              >
                01 · Konsept &amp; Işık
              </button>
              <button
                type="button"
                onClick={() => scrollToStudioSection('step-02-photo')}
                className="px-2.5 py-1 rounded border border-[#D4A359]/25 text-[#F5F2EB]/80 hover:border-[#D4A359] hover:text-[#D4A359] transition-colors cursor-pointer"
              >
                02 · Doğrulama Fotoğrafı
              </button>
              <button
                type="button"
                onClick={() => scrollToStudioSection('step-03-video')}
                className="px-2.5 py-1 rounded border border-[#D4A359]/25 text-[#F5F2EB]/80 hover:border-[#D4A359] hover:text-[#D4A359] transition-colors cursor-pointer"
              >
                03 · 9:16 Video &amp; Trim
              </button>
              <button
                type="button"
                onClick={() => scrollToStudioSection('step-04-scene-editor')}
                className="px-2.5 py-1 rounded bg-[#D4A359] text-[#0B0A09] font-bold transition-opacity hover:opacity-90 inline-flex items-center gap-1 cursor-pointer"
              >
                <Film className="w-3 h-3" />
                <span>04 · Sahne Kurgu Paneli ({sortedSceneNotes.length} Not)</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToStudioSection('step-05-gallery')}
                className="px-2.5 py-1 rounded border border-[#D4A359]/25 text-[#F5F2EB]/80 hover:border-[#D4A359] hover:text-[#D4A359] transition-colors cursor-pointer"
              >
                05 · 6&apos;lı Galeri Paketi
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-[#F5F2EB]/70">
              <span>{resolutionSpec.shortLabel}</span>
              <span>·</span>
              <span>{selectedFps} FPS</span>
              <span>·</span>
              <span>{videoSpeed}x Hız</span>
              <span>·</span>
              <span>
                Aktif Trim: <strong className="text-[#D4A359]">{trimStart.toFixed(1)}s–{trimEnd.toFixed(1)}s</strong>
              </span>
              <span>·</span>
              <span>
                Kalite: <strong className="text-[#D4A359]">{activeQualityReport.overallScore}/100</strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-6 lg:px-10 py-8">
        {activeSection === 'studio' ? (
          <div className="space-y-8">
            {/* ANLAŞILIR KULLANIM REHBERİ & HIZLI MOD BANNERI */}
            {showGuideBanner && (
              <div className="relative overflow-hidden rounded-xl border border-[#D4A359]/35 bg-gradient-to-r from-[#D4A359]/15 via-[#D4A359]/5 to-transparent p-5 backdrop-blur-sm shadow-md">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4A359] text-[#0B0A09] rounded">
                        HIZLI REHBER
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[#F5F2EB]">
                        9:16 Dikey Sosyal Medya Video &amp; Görsel Prompt Stüdyosu
                      </h2>
                    </div>
                    <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                      Bu stüdyo; TikTok, Reels ve Shorts için <strong>Fujifilm 400 film dokulu</strong>, <strong>doğal cilt gözeneklerine sahip</strong>, plastik görünümden uzak ve elde tutulan <strong>3 satırlı fiziksel doğrulama kağıdı</strong> içeren 4K promptlar üretir.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0B0A09]/60 border border-[#D4A359]/20">
                        <span className="w-5 h-5 rounded-full bg-[#D4A359] text-[#0B0A09] flex items-center justify-center text-[11px] font-black shrink-0">1</span>
                        <span className="text-[#F5F2EB]/90">Karakter &amp; Mekan Seç</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0B0A09]/60 border border-[#D4A359]/20">
                        <span className="w-5 h-5 rounded-full bg-[#D4A359] text-[#0B0A09] flex items-center justify-center text-[11px] font-black shrink-0">2</span>
                        <span className="text-[#F5F2EB]/90">3 Satırlı Doğrulama Notu</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0B0A09]/60 border border-[#D4A359]/20">
                        <span className="w-5 h-5 rounded-full bg-[#D4A359] text-[#0B0A09] flex items-center justify-center text-[11px] font-black shrink-0">3</span>
                        <span className="text-[#F5F2EB]/90">4K Promptu Kopyala!</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
                    <div className="flex items-center border border-[#D4A359]/30 rounded-lg p-0.5 bg-[#0B0A09]">
                      <button
                        type="button"
                        onClick={() => setStudioViewMode('simple')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                          studioViewMode === 'simple'
                            ? 'bg-[#D4A359] text-[#0B0A09]'
                            : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                        }`}
                        title="Yeni başlayanlar veya hızlı prompt almak isteyenler için sade görünüm"
                      >
                        ⚡ Sade Mod
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudioViewMode('full')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                          studioViewMode === 'full'
                            ? 'bg-[#D4A359] text-[#0B0A09]'
                            : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                        }`}
                        title="Tüm kurgu ve ses dalgası araçlarını göster"
                      >
                        🎛️ Gelişmiş Mod
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGuideBanner(false)}
                      className="px-2.5 py-1.5 text-xs text-[#F5F2EB]/60 hover:text-[#F5F2EB] rounded hover:bg-[#D4A359]/10 transition-colors cursor-pointer"
                      title="Rehberi Kapat"
                    >
                      Kapat ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: MINIMALIST SELECTION & REALISM BAR */}
            <section
              id="step-01-concept"
              className="bg-[#0B0A09] border border-[#D4A359]/25 p-6 space-y-6 scroll-mt-28"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4A359]">
                    Adım 01 · Konsept &amp; Ham Telefon Çekimi Standardı
                  </span>
                  <h1 className="font-display text-3xl font-semibold text-[#F5F2EB]">
                    Karakter, Ev Ortamı ve Doğrulama Kağıdı
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="px-3.5 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded transition-colors flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {customAnchorFileName
                        ? `Referans: ${customAnchorFileName.slice(0, 16)}...`
                        : 'Referans Fotoğraf Yükle'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAnchorFileUpload}
                      className="hidden"
                    />
                  </label>
                  {customAnchorImageUrl && (
                    <button
                      type="button"
                      onClick={handleClearUploadedAnchor}
                      className="px-2 py-2 text-xs text-[#F5F2EB]/60 hover:text-[#D4A359] cursor-pointer"
                    >
                      Temizle
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={isGeneratingAi}
                    onClick={handleGenerateAiPackage}
                    className="px-4 py-2 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    {isGeneratingAi ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Yazıyor...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI ile Yeniden Yaz</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Minimalist Gold-Accented Realism Notice (Phone Flash + Non-Porcelain Home Texture) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3.5 border-y border-[#D4A359]/15 text-xs">
                <div>
                  <span className="font-semibold text-[#D4A359]">Telefon Çekimi Detayları: </span>
                  <span className="text-[#F5F2EB]/80">&ldquo;{RAW_PHONE_CAMERA_DIRECTIVE_TR}&rdquo;</span>
                </div>
                <div>
                  <span className="font-semibold text-[#D4A359]">Doğal Dokular: </span>
                  <span className="text-[#F5F2EB]/80">&ldquo;{NATURAL_HOME_TEXTURE_DIRECTIVE_TR}&rdquo;</span>
                </div>
              </div>

              {aiError && (
                <div className="text-xs text-[#D4A359] border border-[#D4A359]/40 rounded px-4 py-2.5">
                  {aiError}
                </div>
              )}

              {/* 4 Clean Selectors on Single Dark Canvas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#D4A359]">
                    Saç &amp; Karakter
                  </label>
                  <select
                    value={hairId}
                    onChange={(e) => handleHairChange(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  >
                    {HAIR_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.labelTr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#D4A359]">
                    Kıyafet / Kombin
                  </label>
                  <select
                    value={wardrobeId}
                    onChange={(e) => {
                      setAiOverridePackage(null);
                      setResolvedConflictMap({});
                      setWardrobeId(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  >
                    {WARDROBE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.labelTr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#D4A359]">
                    Günlük Ev / Oda Ortamı
                  </label>
                  <select
                    value={settingId}
                    onChange={(e) => handleSettingChange(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  >
                    {SETTING_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.labelTr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#D4A359]">
                    Video Hareket Stili
                  </label>
                  <select
                    value={turnAngle}
                    onChange={(e) =>
                      handleTurnAngleChange(e.target.value as 'soft' | '180' | '360')
                    }
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  >
                    <option value="soft">Sade &amp; Doğal Gülümseme (Önerilen)</option>
                    <option value="180">180° Yarım Dönüş</option>
                    <option value="360">360° Tam Dönüş</option>
                  </select>
                </div>
              </div>

              {/* ENVIRONMENT-MATCHED LIGHTING MODE (DOĞAL, SICAK, SOĞUK, DRAMATİK) BAR */}
              <div className="border border-[#D4A359]/30 rounded p-3.5 space-y-3 bg-[#0B0A09]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                        Ev Ortamı Uyumlu &lsquo;Işık Modu&rsquo; &amp; Otomatik Aydınlatma Parametreleri
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                        {activeLightingHarmony.kelvinBadge}
                      </span>
                      {activeLightingHarmony.isRecommendedForRoom ? (
                        <span className="text-[10px] font-mono text-[#D4A359]">
                          ✓ Seçili Ev Ortamı İle Tam Uyumlu
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setAutoSyncLightingWithRoom(true);
                            handleLightingModeChange(
                              activeLightingHarmony.recommendedModeId,
                              true
                            );
                          }}
                          className="text-[10px] font-mono text-[#D4A359] underline cursor-pointer"
                        >
                          Oda İçin Önerilen &ldquo;{activeLightingHarmony.recommendedModeLabelTr}&rdquo; Moduna Dön
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#F5F2EB]/75 leading-snug">
                      {activeLightingHarmony.roomHarmonyNoteTr}
                    </p>
                  </div>

                  {/* 4 Lighting Mode Buttons: Doğal / Sıcak / Soğuk / Dramatik */}
                  <div
                    role="group"
                    aria-label="Işık Modu Seçimi (Doğal, Sıcak, Soğuk, Dramatik)"
                    className="inline-flex flex-wrap items-center border border-[#D4A359]/40 rounded overflow-hidden shrink-0"
                  >
                    {LIGHTING_MODE_OPTIONS.map((lMode) => {
                      const isActive = lightingMode === lMode.id;
                      const isRoomDefault =
                        activeLightingHarmony.recommendedModeId === lMode.id;
                      return (
                        <button
                          key={lMode.id}
                          type="button"
                          onClick={() => handleLightingModeChange(lMode.id)}
                          className={`px-3 py-1.5 text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#D4A359] text-[#0B0A09]'
                              : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold block leading-tight">
                            {lMode.shortLabelTr}{' '}
                            {isRoomDefault ? '★' : ''}
                          </span>
                          <span
                            className={`text-[9px] font-mono block leading-tight ${
                              isActive ? 'text-[#0B0A09]/80' : 'text-[#D4A359]/80'
                            }`}
                          >
                            {lMode.kelvin}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PROMPT CONFLICT WARNING, 'TOPLU UZLAŞTIRMA' PROPOSAL & AUTOMATIC 'HIZLI ONARIM' WIZARD */}
              <div className="space-y-3.5 pt-2">
                {conflictNoticeTr && (
                  <div className="border border-[#D4A359] rounded px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#D4A359] bg-[#0B0A09]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{conflictNoticeTr}</span>
                    </div>
                    {previousConfigSnapshot && (
                      <button
                        type="button"
                        onClick={handleUndoQuickRepair}
                        className="inline-flex items-center gap-1 text-[11px] font-mono underline cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Önceki Konfigürasyona Dön</span>
                      </button>
                    )}
                  </div>
                )}

                {activeConflicts.length > 0 ? (
                  <div className="border border-[#D4A359]/50 rounded p-4 space-y-4 bg-[#0B0A09]">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#D4A359]/20 pb-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359] block">
                            Prompt Çakışma Uyarısı ({activeConflicts.length} Çelişki Tespit Edildi)
                          </span>
                          <span className="text-[11px] text-[#F5F2EB]/70 block">
                            Seçtiğiniz saç, kıyafet ve ortam kombinasyonunda görsel/video kalitesini düşürebilecek çakışmalar bulundu.
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleResolveAllConflicts}
                          className="px-3 py-1.5 text-xs font-semibold border border-[#D4A359] text-[#D4A359] hover:bg-[#D4A359]/15 rounded transition-colors cursor-pointer"
                        >
                          Toplu Uzlaştırma Uygula ({activeConflicts.length} Çakışma)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRunQuickRepairWizard()}
                          className="px-3.5 py-1.5 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          <span>Hızlı Onarım Sihirbazı (Tek Tıkla Optimize Et)</span>
                        </button>
                      </div>
                    </div>

                    {/* TOPLU UZLAŞTIRMA ÖNERİSİ (UNIFIED BATCH RECONCILIATION PROPOSAL) CARD */}
                    <div className="border border-[#D4A359]/40 rounded p-3.5 space-y-2.5 bg-[#0B0A09]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                            {batchReconciliationPlan.unifiedHarmonyTitleTr}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[#F5F2EB]/80">
                          Kalite Etkisi:{' '}
                          <span className="text-[#F5F2EB]/60">
                            {batchReconciliationPlan.estimatedScoreBefore}/100
                          </span>{' '}
                          →{' '}
                          <strong className="text-[#D4A359]">
                            {batchReconciliationPlan.estimatedScoreAfterHarmony}/100
                          </strong>
                        </div>
                      </div>

                      <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                        {batchReconciliationPlan.unifiedHarmonyDescriptionTr}
                      </p>

                      <div className="border-t border-[#D4A359]/15 pt-2 space-y-1 text-[11px] font-mono">
                        <div className="text-[#D4A359]">
                          Birleşik Türkçe Uzlaştırma Sentezi:{' '}
                          <span className="text-[#F5F2EB]/85">
                            {batchReconciliationPlan.unifiedHarmonyPatchTr}
                          </span>
                        </div>
                        <div className="text-[#F5F2EB]/60 break-words">
                          EN Directive: {batchReconciliationPlan.unifiedHarmonyPatchEn}
                        </div>
                      </div>
                    </div>

                    {/* Individual Conflict Items */}
                    <div className="space-y-2.5">
                      {activeConflicts.map((conflict) => (
                        <div
                          key={conflict.id}
                          className="border border-[#D4A359]/25 rounded p-3 space-y-2 bg-[#0B0A09]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-mono font-bold text-[#D4A359]">
                                {conflict.categoryTr}
                              </span>
                              <span aria-hidden="true" className="text-[#D4A359]/50">
                                ·
                              </span>
                              <span className="font-semibold text-[#F5F2EB]">
                                {conflict.titleTr}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#D4A359]/90">
                              {conflict.conflictingItemsTr}
                            </span>
                          </div>

                          <p className="text-xs text-[#F5F2EB]/75 leading-relaxed">
                            {conflict.descriptionTr}
                          </p>

                          <div className="text-[11px] text-[#D4A359] font-medium">
                            Çözüm Önerisi:{' '}
                            <span className="text-[#F5F2EB]/85 font-normal">
                              {conflict.recommendationTr}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {conflict.resolutions.map((resOpt) => {
                              const isPrimary = resOpt.actionType === 'apply_harmony_patch';
                              return (
                                <button
                                  key={resOpt.id}
                                  type="button"
                                  onClick={() => handleResolveConflict(conflict, resOpt)}
                                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                                    isPrimary
                                      ? 'bg-[#D4A359] text-[#0B0A09] hover:opacity-90'
                                      : 'border border-[#D4A359]/45 text-[#D4A359] hover:border-[#D4A359]'
                                  }`}
                                >
                                  {resOpt.labelTr}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#D4A359]/25 rounded px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#F5F2EB]/85">
                      <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0" />
                      <span>
                        ✓ Prompt Çakışma Kontrolü: Seçili saç, kıyafet ve ev ortamı ayarları birbiriyle tam uyumlu.
                        {Object.keys(resolvedConflictMap).length > 0 &&
                          ` (${Object.keys(resolvedConflictMap).length} uzlaştırma kuralı aktif)`}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={handleLoadSampleMultiConflictScenario}
                        className="text-[11px] font-mono text-[#D4A359] hover:underline cursor-pointer"
                      >
                        Örnek Çoklu Çakışma Testi Yükle
                      </button>
                      {Object.keys(resolvedConflictMap).length > 0 && (
                        <button
                          type="button"
                          onClick={() => setResolvedConflictMap({})}
                          className="text-[11px] font-mono text-[#F5F2EB]/60 hover:text-[#D4A359] underline cursor-pointer"
                        >
                          Uzlaştırmaları Sıfırla
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* AUTOMATIC 'HIZLI ONARIM' (QUICK REPAIR) WIZARD & 6-DIMENSION STUDIO DIAGNOSTIC */}
                <div className="border border-[#D4A359]/35 rounded p-4 space-y-3.5 bg-[#0B0A09]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Wand2 className="w-4 h-4 text-[#D4A359]" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                          Otomatik &lsquo;Hızlı Onarım&rsquo; Sihirbazı &amp; Toplu Konfigürasyon Optimizasyonu
                        </span>
                        <span className="text-[11px] font-mono text-[#F5F2EB]/65">
                          · Mevcut Skor: {batchReconciliationPlan.estimatedScoreBefore}/100 → Hedef:{' '}
                          <strong className="text-[#D4A359]">
                            {quickRepairMode === 'harmony_keep'
                              ? batchReconciliationPlan.estimatedScoreAfterHarmony
                              : batchReconciliationPlan.estimatedScoreAfterSmartPreset}
                            /100
                          </strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#F5F2EB]/70">
                        Mevcut saç, kıyafet, ev ortamı, ışık modu, FPS ve kamera yolu konfigürasyonunuzu 6 boyutta tarar ve tek seferde optimize eder.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRunQuickRepairWizard(quickRepairMode)}
                        className="px-3.5 py-2 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Tek Seferde Hızlı Onar &amp; Optimize Et</span>
                      </button>

                      {previousConfigSnapshot && (
                        <button
                          type="button"
                          onClick={handleUndoQuickRepair}
                          className="px-3 py-2 text-xs font-mono text-[#D4A359] border border-[#D4A359]/40 rounded hover:border-[#D4A359] inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Geri Al</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowQuickRepairWizard((prev) => !prev)}
                        className="px-2.5 py-2 text-xs font-mono text-[#F5F2EB]/75 border border-[#D4A359]/25 rounded hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showQuickRepairWizard ? 'Sihirbazı Daralt' : 'Detayları Aç'}</span>
                        {showQuickRepairWizard ? (
                          <ChevronUp className="w-3.5 h-3.5 text-[#D4A359]" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-[#D4A359]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {showQuickRepairWizard && (
                    <div className="space-y-3.5 pt-2 border-t border-[#D4A359]/20">
                      {/* 2-Mode Wizard Strategy Selector */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <span className="text-[11px] font-mono text-[#D4A359] uppercase tracking-wider">
                          Onarım Stratejisi Seçimi:
                        </span>

                        <div
                          role="group"
                          aria-label="Hızlı Onarım Sihirbazı Modu"
                          className="inline-flex flex-wrap items-center border border-[#D4A359]/40 rounded overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setQuickRepairMode('harmony_keep')}
                            className={`px-3 py-1.5 text-left transition-colors cursor-pointer ${
                              quickRepairMode === 'harmony_keep'
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold block leading-tight">
                              Mod 1 · Seçimleri Koru &amp; Toplu Uzlaştır
                            </span>
                            <span
                              className={`text-[9px] font-mono block leading-tight ${
                                quickRepairMode === 'harmony_keep'
                                  ? 'text-[#0B0A09]/80'
                                  : 'text-[#D4A359]/80'
                              }`}
                            >
                              Saç/Kıyafet/Odayı Korur + Teknik Kalibrasyon
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setQuickRepairMode('smart_preset')}
                            className={`px-3 py-1.5 text-left transition-colors cursor-pointer ${
                              quickRepairMode === 'smart_preset'
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold block leading-tight">
                              Mod 2 · Tam Otomatik Sıfır-Çakışma Onarımı
                            </span>
                            <span
                              className={`text-[9px] font-mono block leading-tight ${
                                quickRepairMode === 'smart_preset'
                                  ? 'text-[#0B0A09]/80'
                                  : 'text-[#D4A359]/80'
                              }`}
                            >
                              Çakışan Seçimleri En Uyumlu Alternatifle Değiştirir
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* 6-Dimension Diagnostic Matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {batchReconciliationPlan.diagnosticSteps.map((step) => (
                          <div
                            key={step.id}
                            className={`border rounded p-2.5 space-y-1 bg-[#0B0A09] ${
                              step.status === 'conflict'
                                ? 'border-[#D4A359]'
                                : step.status === 'suboptimal'
                                ? 'border-[#D4A359]/50'
                                : 'border-[#D4A359]/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                              <span className="text-[#D4A359] font-bold">
                                0{step.stepNumber} · {step.dimensionTr}
                              </span>
                              <span className="text-[#F5F2EB]/80">
                                {step.status === 'conflict'
                                  ? `ÇAKIŞMA (+${step.scoreGain}p)`
                                  : step.status === 'suboptimal'
                                  ? `KALİBRE (+${step.scoreGain}p)`
                                  : '✓ OPTİMUM'}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#F5F2EB]/75 leading-snug">
                              {step.currentStateTr}
                            </p>
                            <p className="text-[10px] font-mono text-[#D4A359]/90 leading-snug">
                              Onarım: {step.targetActionTr}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Applied Repair Log Summary */}
                      {quickRepairAppliedLog.length > 0 && (
                        <div className="border border-[#D4A359]/35 rounded p-3 space-y-1.5 bg-[#0B0A09] text-xs">
                          <div className="font-mono text-[11px] uppercase tracking-wider text-[#D4A359]">
                            ✓ Son Hızlı Onarım Sihirbazı İşlem Özeti ({quickRepairAppliedLog.length} Adım Uygulandı):
                          </div>
                          <ul className="space-y-1 text-[11px] text-[#F5F2EB]/85 font-mono">
                            {quickRepairAppliedLog.map((item, idx) => (
                              <li key={idx}>
                                {idx + 1}. {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 3-Line Verification Card Text Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-[#F5F2EB]/65">
                    Kağıt 1. Satır (Başlık)
                  </label>
                  <input
                    type="text"
                    value={verificationHeader}
                    onChange={(e) => {
                      setAiOverridePackage(null);
                      setVerificationHeader(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#0B0A09] border border-[#D4A359]/25 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-[#F5F2EB]/65">
                    Kağıt 2. Satır (Tarih)
                  </label>
                  <input
                    type="text"
                    value={verificationDate}
                    onChange={(e) => {
                      setAiOverridePackage(null);
                      setVerificationDate(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#0B0A09] border border-[#D4A359]/25 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-[#F5F2EB]/65">
                    Kağıt 3. Satır (Web Sitesi / Not)
                  </label>
                  <input
                    type="text"
                    value={verificationWebsite}
                    onChange={(e) => {
                      setAiOverridePackage(null);
                      setVerificationWebsite(e.target.value);
                    }}
                    placeholder="İsteğe bağlı..."
                    className="w-full px-3 py-2 text-xs font-mono bg-[#0B0A09] border border-[#D4A359]/25 rounded text-[#F5F2EB] placeholder:text-[#F5F2EB]/30 focus:outline-none focus:border-[#D4A359]"
                  />
                </div>
              </div>
            </section>

            {/* STEP 2 & 3: SIDE-BY-SIDE PHOTO & VIDEO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* LEFT COLUMN: 9:16 VERIFICATION PHOTO */}
              <section
                id="step-02-photo"
                className="bg-[#0B0A09] border border-[#D4A359]/25 p-6 flex flex-col justify-between space-y-6 scroll-mt-28"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 border-b border-[#D4A359]/20 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-5 h-5 text-[#D4A359]" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359] block">
                          Adım 02 · Flaşlı Ham Telefon Fotoğrafı
                        </span>
                        <h2 className="font-display text-2xl font-semibold text-[#F5F2EB]">
                          Doğrulama Fotoğrafı (9:16)
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isGeneratingVerifyImage}
                      onClick={handleGenerateVerifyPhoto}
                      className="px-4 py-2.5 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                      {isGeneratingVerifyImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Üretiliyor (%{verifyImageProgress})</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="w-4 h-4" />
                          <span>Fotoğrafı Üret</span>
                        </>
                      )}
                    </button>
                  </div>

                  {verifyImageError && (
                    <div className="text-xs text-[#D4A359] border border-[#D4A359]/40 rounded px-3.5 py-2.5">
                      {verifyImageError}
                    </div>
                  )}

                  {/* Minimalist 9:16 Preview Row */}
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative w-full max-w-[180px] aspect-[9/16] rounded overflow-hidden bg-[#0B0A09] border border-[#D4A359]/30 shrink-0">
                      <img
                        src={activePreviewImg}
                        alt="9:16 Doğrulama Önizleme"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {!generatedVerifyImageUrl && (
                        <div className="verification-paper-badge absolute left-1/2 -translate-x-1/2 bottom-[25%] w-[82%] rounded px-2 py-1.5 text-center pointer-events-none">
                          <div className="font-mono text-[11px] font-bold truncate">
                            {verificationHeader || 'VERIFIED'}
                          </div>
                          <div className="font-mono text-[10px] font-semibold truncate">
                            {verificationDate || '04.10.2026'}
                          </div>
                          {verificationWebsite && (
                            <div className="font-mono text-[9px] truncate">
                              {verificationWebsite}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#D4A359]">
                        {generatedVerifyImageUrl
                          ? '✓ Ham Telefon Fotoğrafı Hazır'
                          : 'Türkçe Sahne & Doku Özeti'}
                      </div>
                      <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                        {currentPackage.verificationPhotoPrompt.descriptionTr}
                      </p>
                      {generatedVerifyImageUrl && (
                        <a
                          href={generatedVerifyImageUrl}
                          download={`vespera-dogrulama-${currentPackage.code.toLowerCase()}.png`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Fotoğrafı İndir (.PNG)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Minimalist Photo Prompt Block + Advanced Prompt Filter Quick Bar */}
                <div className="space-y-3 pt-4 border-t border-[#D4A359]/15">
                  <div className="border border-[#D4A359]/30 rounded p-3 space-y-2.5 bg-[#0B0A09]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                          İleri Düzey Prompt Filtreleri &amp; Anahtar Kelime Ağırlığı
                        </span>
                        <span className="text-[11px] text-[#F5F2EB]/65">
                          {activeFilterSpec.toneTitleTr}
                        </span>
                      </div>

                      <div
                        role="group"
                        aria-label="İleri Düzey Prompt Filtresi Seçimi"
                        className="inline-flex items-center border border-[#D4A359]/40 rounded overflow-hidden shrink-0"
                      >
                        {ADVANCED_PROMPT_FILTER_OPTIONS.map((fOpt) => {
                          const isSelected = advancedFilterId === fOpt.id;
                          return (
                            <button
                              key={fOpt.id}
                              type="button"
                              onClick={() => handleAdvancedFilterChange(fOpt.id)}
                              className={`px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {fOpt.id === 'fotogercekci'
                                ? 'Fotogerçekçi'
                                : fOpt.id === 'cinematic'
                                ? 'Cinematic'
                                : 'Sanatsal'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                      <span className="text-[#D4A359]">Ağırlıklı Anahtar Kelimeler:</span>
                      {activeFilterSpec.weightedTokens.slice(0, 2).map((wt) => (
                        <code
                          key={wt.tokenEn}
                          className="px-1.5 py-0.5 border border-[#D4A359]/25 rounded text-[#F5F2EB]/85"
                        >
                          {wt.effectiveWeight}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                      Fotoğraf Promptu (İngilizce · {activeFilterSpec.badgeTr})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
                          currentPackage.verificationPhotoPrompt.midjourneyEn,
                          'copy-photo'
                        )
                      }
                      className="px-3 py-1 text-xs font-medium text-[#D4A359] border border-[#D4A359]/35 hover:border-[#D4A359] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedTarget === 'copy-photo' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="w-full max-h-36 overflow-y-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[#F5F2EB]/90 bg-[#0B0A09] border border-[#D4A359]/20 rounded p-3.5 select-all">
                    {currentPackage.verificationPhotoPrompt.midjourneyEn}
                  </pre>
                </div>
              </section>

              {/* RIGHT COLUMN: 9:16 VIDEO */}
              <section
                id="step-03-video"
                className="bg-[#0B0A09] border border-[#D4A359]/25 p-6 flex flex-col justify-between space-y-6 scroll-mt-28"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 border-b border-[#D4A359]/20 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Video className="w-5 h-5 text-[#D4A359]" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359] block">
                          Adım 03 · 9:16 Dikey Video (Veo 3.1 Pro)
                        </span>
                        <h2 className="font-display text-2xl font-semibold text-[#F5F2EB]">
                          Dikey Video Üretimi (9:16)
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isGeneratingVideo}
                      onClick={handleGenerateVeoVideo}
                      className="px-4 py-2.5 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                      {isGeneratingVideo ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Üretiliyor (%{videoGenProgress})</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          <span>Videoyu Üret</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isGeneratingVideo && (
                    <div className="border border-[#D4A359]/35 rounded p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#D4A359] font-mono">
                        <span>{videoGenStageText}</span>
                        <span>%{videoGenProgress}</span>
                      </div>
                      <div className="w-full h-1 bg-[#D4A359]/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D4A359] transition-all duration-300"
                          style={{ width: `${videoGenProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {videoGenError && (
                    <div className="text-xs text-[#D4A359] border border-[#D4A359]/40 rounded px-3.5 py-2.5">
                      {videoGenError}
                    </div>
                  )}

                  {/* Minimalist 9:16 Video Player Row + Interactive 2D Camera Path Map */}
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative w-full max-w-[180px] aspect-[9/16] rounded overflow-hidden bg-[#0B0A09] border border-[#D4A359]/30 shrink-0 flex flex-col items-center justify-between">
                      {generatedVideoUrl ? (
                        <video
                          ref={videoRef}
                          src={generatedVideoUrl}
                          controls
                          autoPlay
                          loop={isLoopEnabled}
                          playsInline
                          onLoadedMetadata={handleVideoLoadedMetadata}
                          onTimeUpdate={handleVideoTimeUpdate}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full p-3.5 flex flex-col items-center justify-between text-center">
                          <div className="w-full flex items-center justify-between text-[9px] font-mono text-[#D4A359] border-b border-[#D4A359]/20 pb-1.5">
                            <span>9:16 VİZÖR</span>
                            <span>
                              {videoResolution.toUpperCase()} · {selectedFps}FPS
                            </span>
                          </div>

                          {/* 2D Animated Camera Path & Subject Rotation Mini-Icon inside 9:16 Viewfinder */}
                          <div className="my-auto flex flex-col items-center space-y-2">
                            <svg
                              viewBox="0 0 120 120"
                              className="w-24 h-24 overflow-visible"
                              aria-label="2D Kamera Yolu ve Dönüş Simülasyonu"
                            >
                              {/* Outer Studio Radar Ring */}
                              <circle
                                cx="60"
                                cy="52"
                                r="36"
                                fill="none"
                                stroke="#D4A359"
                                strokeOpacity="0.2"
                                strokeDasharray="3 3"
                              />

                              {/* Mode-Specific 2D Trajectory Path */}
                              {turnAngle === '360' && (
                                <g>
                                  <circle
                                    cx="60"
                                    cy="52"
                                    r="24"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.75"
                                    strokeDasharray="6 3"
                                  >
                                    <animateTransform
                                      attributeName="transform"
                                      type="rotate"
                                      from="0 60 52"
                                      to="360 60 52"
                                      dur="4.5s"
                                      repeatCount="indefinite"
                                    />
                                  </circle>
                                  {/* Orbiting Direction Node */}
                                  <g>
                                    <circle cx="60" cy="28" r="3.5" fill="#D4A359" />
                                    <animateTransform
                                      attributeName="transform"
                                      type="rotate"
                                      from="0 60 52"
                                      to="360 60 52"
                                      dur="4.5s"
                                      repeatCount="indefinite"
                                    />
                                  </g>
                                  {/* Counter-stabilized 0.15x Camera Gimbal Arc */}
                                  <path
                                    d="M 36 96 Q 60 86 84 96"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                  />
                                </g>
                              )}

                              {turnAngle === '180' && (
                                <g>
                                  {/* 180-Degree Half-Turn Arc */}
                                  <path
                                    d="M 36 52 A 24 24 0 1 1 84 52"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.75"
                                    strokeDasharray="4 2"
                                  />
                                  <g>
                                    <line
                                      x1="60"
                                      y1="52"
                                      x2="60"
                                      y2="74"
                                      stroke="#D4A359"
                                      strokeWidth="1.75"
                                    />
                                    <circle cx="60" cy="74" r="3.5" fill="#D4A359" />
                                    <animateTransform
                                      attributeName="transform"
                                      type="rotate"
                                      values="-85 60 52; 85 60 52; -85 60 52"
                                      dur="4s"
                                      repeatCount="indefinite"
                                    />
                                  </g>
                                  {/* Lateral 0.15x Micro-Track Line */}
                                  <line
                                    x1="40"
                                    y1="96"
                                    x2="80"
                                    y2="96"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                  />
                                </g>
                              )}

                              {turnAngle === 'soft' && (
                                <g>
                                  {/* Soft Frontal Gaze Cone & 0.1x Optical Push-In */}
                                  <polygon
                                    points="60,54 44,92 76,92"
                                    fill="#D4A359"
                                    fillOpacity="0.1"
                                    stroke="#D4A359"
                                    strokeOpacity="0.4"
                                    strokeWidth="1"
                                  />
                                  <g>
                                    <line
                                      x1="60"
                                      y1="52"
                                      x2="60"
                                      y2="74"
                                      stroke="#D4A359"
                                      strokeWidth="2"
                                    />
                                    <circle cx="60" cy="74" r="3" fill="#D4A359" />
                                    <animateTransform
                                      attributeName="transform"
                                      type="rotate"
                                      values="-6 60 52; 6 60 52; -6 60 52"
                                      dur="3.2s"
                                      repeatCount="indefinite"
                                    />
                                  </g>
                                </g>
                              )}

                              {/* Central Model & 3-Line Card Marker */}
                              <circle
                                cx="60"
                                cy="52"
                                r="7"
                                fill="#0B0A09"
                                stroke="#F5F2EB"
                                strokeWidth="2"
                              />
                              <rect
                                x="51"
                                y="61"
                                width="18"
                                height="4"
                                rx="1"
                                fill="#D4A359"
                              />

                              {/* Smartphone Camera Icon at Bottom */}
                              <g>
                                <rect
                                  x="52"
                                  y="93"
                                  width="16"
                                  height="10"
                                  rx="2"
                                  fill="#D4A359"
                                />
                                <circle cx="60" cy="98" r="2.2" fill="#0B0A09" />
                                {turnAngle === 'soft' && (
                                  <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    values="0 0; 0 -4; 0 0"
                                    dur="3.2s"
                                    repeatCount="indefinite"
                                  />
                                )}
                                {turnAngle === '180' && (
                                  <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    values="-10 0; 10 0; -10 0"
                                    dur="4s"
                                    repeatCount="indefinite"
                                  />
                                )}
                                {turnAngle === '360' && (
                                  <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    values="-12 -2; 0 -5; 12 -2; 0 -5; -12 -2"
                                    dur="4.5s"
                                    repeatCount="indefinite"
                                  />
                                )}
                              </g>
                            </svg>

                            <span className="text-[10px] font-mono text-[#D4A359] uppercase tracking-wider">
                              {turnAngle === '360'
                                ? '360° Tam Dönüş Yolu'
                                : turnAngle === '180'
                                ? '180° Yarım Dönüş Yolu'
                                : '0° Sabit & Mikro Push-In'}
                            </span>
                            {activePlayheadSceneNote ? (
                              <div className="w-full px-1.5 py-1 rounded border border-[#D4A359]/30 bg-[#D4A359]/10 text-[9px] font-mono text-left space-y-0.5">
                                <div className="text-[#D4A359] font-bold truncate">
                                  {activePlayheadSceneNote.titleTr}
                                </div>
                                <div className="text-[#F5F2EB]/75 line-clamp-2 leading-tight">
                                  {activePlayheadSceneNote.descriptionTr}
                                </div>
                              </div>
                            ) : (
                              <p className="text-[10px] text-[#F5F2EB]/60 leading-snug">
                                &ldquo;Videoyu Üret&rdquo; ile 9:16 video burada oynatılır.
                              </p>
                            )}
                          </div>

                          <div className="w-full text-[9px] font-mono text-[#F5F2EB]/60 border-t border-[#D4A359]/15 pt-1.5 flex items-center justify-between">
                            <span>.{videoFileFormat.toUpperCase()} ({resolutionSpec.shortLabel})</span>
                            <span className="text-[#D4A359] font-bold">
                              {trimStart.toFixed(1)}–{trimEnd.toFixed(1)}sn
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3.5 flex-1 w-full">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#D4A359]">
                        {generatedVideoUrl
                          ? `✓ 9:16 Video Hazır (${resolutionSpec.width}×${resolutionSpec.height} · ${selectedFps} FPS · ${videoSpeed}x · .${videoFileFormat.toUpperCase()})`
                          : `Türkçe Video Senaryosu (${resolutionSpec.shortLabel} · ${selectedFps} FPS · ${videoSpeed}x Hız)`}
                      </div>
                      <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                        {currentPackage.videoPrompt.scenarioTr}
                      </p>

                      {/* INTERACTIVE 2D CAMERA PATH & ROTATION PREVIEW MAP */}
                      <div className="border border-[#D4A359]/30 rounded p-3 space-y-2.5 bg-[#0B0A09]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-[#D4A359]" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                              2D İnteraktif Kamera Yolu &amp; Dönüş Önizleme Haritası
                            </span>
                          </div>

                          {/* Interactive Soft / 180 / 360 Mode Switcher on the 2D Map */}
                          <div className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden">
                            {(
                              [
                                { id: 'soft', label: 'Soft (0°)' },
                                { id: '180', label: '180° Dönüş' },
                                { id: '360', label: '360° Dönüş' },
                              ] as const
                            ).map((mode) => (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => handleTurnAngleChange(mode.id)}
                                className={`px-2.5 py-1 text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                                  turnAngle === mode.id
                                    ? 'bg-[#D4A359] text-[#0B0A09]'
                                    : 'bg-[#0B0A09] text-[#F5F2EB]/70 hover:text-[#D4A359]'
                                }`}
                              >
                                {mode.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
                          {/* Interactive 2D Top-Down Radar SVG */}
                          <div className="relative w-28 h-24 rounded border border-[#D4A359]/25 bg-[#0B0A09] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 140 110" className="w-full h-full">
                              {/* Grid crosshairs */}
                              <line
                                x1="70"
                                y1="8"
                                x2="70"
                                y2="102"
                                stroke="#D4A359"
                                strokeOpacity="0.15"
                                strokeDasharray="2 2"
                              />
                              <line
                                x1="15"
                                y1="45"
                                x2="125"
                                y2="45"
                                stroke="#D4A359"
                                strokeOpacity="0.15"
                                strokeDasharray="2 2"
                              />

                              {/* Subject Rotation Path */}
                              {turnAngle === '360' && (
                                <>
                                  <circle
                                    cx="70"
                                    cy="45"
                                    r="22"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 2"
                                  />
                                  <g>
                                    <line
                                      x1="70"
                                      y1="45"
                                      x2="70"
                                      y2="23"
                                      stroke="#D4A359"
                                      strokeWidth="2"
                                    />
                                    <circle cx="70" cy="23" r="3" fill="#D4A359" />
                                    {activeMapPhase === 'live' ? (
                                      <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0 70 45"
                                        to="360 70 45"
                                        dur="3.8s"
                                        repeatCount="indefinite"
                                      />
                                    ) : (
                                      <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from={`${activeMapPhase * 135} 70 45`}
                                        to={`${activeMapPhase * 135} 70 45`}
                                        dur="1s"
                                        repeatCount="indefinite"
                                      />
                                    )}
                                  </g>
                                  <path
                                    d="M 42 90 Q 70 78 98 90"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                  />
                                </>
                              )}

                              {turnAngle === '180' && (
                                <>
                                  <path
                                    d="M 48 45 A 22 22 0 1 1 92 45"
                                    fill="none"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 2"
                                  />
                                  <g>
                                    <line
                                      x1="70"
                                      y1="45"
                                      x2="70"
                                      y2="67"
                                      stroke="#D4A359"
                                      strokeWidth="2"
                                    />
                                    <circle cx="70" cy="67" r="3" fill="#D4A359" />
                                    {activeMapPhase === 'live' && (
                                      <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        values="-80 70 45; 80 70 45; -80 70 45"
                                        dur="3.5s"
                                        repeatCount="indefinite"
                                      />
                                    )}
                                  </g>
                                  <line
                                    x1="46"
                                    y1="90"
                                    x2="94"
                                    y2="90"
                                    stroke="#D4A359"
                                    strokeWidth="1.5"
                                  />
                                </>
                              )}

                              {turnAngle === 'soft' && (
                                <>
                                  <polygon
                                    points="70,48 52,88 88,88"
                                    fill="#D4A359"
                                    fillOpacity="0.12"
                                    stroke="#D4A359"
                                    strokeOpacity="0.45"
                                    strokeWidth="1"
                                  />
                                  <line
                                    x1="70"
                                    y1="88"
                                    x2="70"
                                    y2="64"
                                    stroke="#D4A359"
                                    strokeWidth="1.75"
                                  />
                                  <circle cx="70" cy="64" r="2.5" fill="#D4A359" />
                                </>
                              )}

                              {/* Subject Node */}
                              <circle
                                cx="70"
                                cy="45"
                                r="5.5"
                                fill="#0B0A09"
                                stroke="#F5F2EB"
                                strokeWidth="2"
                              />
                              {/* Camera Node */}
                              <rect
                                x="63"
                                y="86"
                                width="14"
                                height="8"
                                rx="1.5"
                                fill="#D4A359"
                              />
                            </svg>
                          </div>

                          {/* Phase Scrubber & Camera Trajectory Description */}
                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setActiveMapPhase('live')}
                                className={`px-2 py-0.5 text-[10px] font-mono rounded border cursor-pointer ${
                                  activeMapPhase === 'live'
                                    ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                                    : 'border-[#D4A359]/30 text-[#F5F2EB]/70'
                                }`}
                              >
                                Canlı Döngü
                              </button>
                              {activeCameraPathSpec.phases.map((p, idx) => {
                                const phaseIdx = idx as 0 | 1 | 2;
                                return (
                                  <button
                                    key={p.timeRange}
                                    type="button"
                                    onClick={() => setActiveMapPhase(phaseIdx)}
                                    className={`px-2 py-0.5 text-[10px] font-mono rounded border cursor-pointer ${
                                      activeMapPhase === phaseIdx
                                        ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                                        : 'border-[#D4A359]/30 text-[#F5F2EB]/70'
                                    }`}
                                  >
                                    Faz {idx + 1} ({p.timeRange})
                                  </button>
                                );
                              })}
                            </div>

                            <p className="text-[11px] text-[#F5F2EB]/80 leading-snug">
                              {activeMapPhase === 'live' ? (
                                <>
                                  <strong className="text-[#D4A359]">
                                    {activeCameraPathSpec.modeTitleTr}:
                                  </strong>{' '}
                                  {turnAngle === '360'
                                    ? 'Model yüksek topuklular üzerinde 360° tam tur dönerken kamera 0.15x sarsıntısız yay çizer.'
                                    : turnAngle === '180'
                                    ? 'Model 180° yarım dönüş yapıp omuz üstünden bakarken kamera 0.15x yanal kayma ile takip eder.'
                                    : 'Model sabit göz teması ve doğal gülümsemeyle dururken kamera 0.1x mikro optik yaklaşma yapar.'}
                                </>
                              ) : (
                                <>
                                  <strong className="text-[#D4A359]">
                                    {activeCameraPathSpec.phases[activeMapPhase]?.phaseTitleTr} (
                                    {activeCameraPathSpec.phases[activeMapPhase]?.cameraPathTr}):
                                  </strong>{' '}
                                  {activeCameraPathSpec.phases[activeMapPhase]?.actionTr}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {generatedVideoUrl && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleDownloadVideo}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>
                              Videoyu İndir (.{videoFileFormat.toUpperCase()} ·{' '}
                              {resolutionSpec.shortLabel})
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsLoopEnabled((prev) => !prev)}
                            className="px-3 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/35 rounded flex items-center gap-1.5 cursor-pointer"
                          >
                            <Repeat className="w-3.5 h-3.5" />
                            <span>{isLoopEnabled ? 'Döngü: Açık' : 'Döngü: Kapalı'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowVideoTools((prev) => !prev)}
                            className="px-3 py-2 text-xs font-medium text-[#F5F2EB]/80 border border-[#D4A359]/25 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Scissors className="w-3.5 h-3.5 text-[#D4A359]" />
                            <span>Kes (Trim)</span>
                            {showVideoTools ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Video Metrics, 24/30/60 FPS & Video Speed (0.5x, 1x, 2x) Panel */}
                  <div className="border-t border-[#D4A359]/20 pt-4 space-y-4 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                          Video Metrikleri · Kare Hızı (FPS) &amp; Video Hızı (Video Speed)
                        </span>
                        <span className="text-[11px] text-[#F5F2EB]/65">
                          Seçilen FPS ({selectedFps}fps) ve Video Hızı ({videoSpeed}x) direktifleri video promptuna otomatik eklenir.
                        </span>
                      </div>

                      {/* 24 / 30 / 60 FPS Toggle */}
                      <div
                        role="group"
                        aria-label="Kare Hızı (FPS) Seçimi"
                        className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden shrink-0"
                      >
                        {FPS_OPTIONS.map((fpsOpt) => {
                          const isActive = selectedFps === fpsOpt.value;
                          return (
                            <button
                              key={fpsOpt.value}
                              type="button"
                              onClick={() => handleFpsToggle(fpsOpt.value)}
                              className={`px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {fpsOpt.labelTr}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* VIDEO SPEED CONTROL (0.5x, 1x, 2x) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#D4A359]/15">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                          Video Hızı (Video Speed: 0.5x / 1x / 2x)
                        </span>
                        <span className="text-[11px] text-[#F5F2EB]/70 block">
                          <strong className="text-[#D4A359]">{activeSpeedSpec.badgeTr}:</strong>{' '}
                          {activeSpeedSpec.directiveTr}
                        </span>
                      </div>

                      <div
                        role="group"
                        aria-label="Video Speed (0.5x, 1x, 2x)"
                        className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden shrink-0"
                      >
                        {VIDEO_SPEED_OPTIONS.map((spdOpt) => {
                          const isActive = videoSpeed === spdOpt.value;
                          return (
                            <button
                              key={spdOpt.value}
                              type="button"
                              onClick={() => handleVideoSpeedChange(spdOpt.value)}
                              className={`px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {spdOpt.labelTr}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expanded Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-3 border-y border-[#D4A359]/15 font-mono text-[11px]">
                      <div>
                        <span className="text-[#F5F2EB]/55 block">Çözünürlük</span>
                        <strong className="text-[#F5F2EB]">
                          {resolutionSpec.width}×{resolutionSpec.height} ({resolutionSpec.shortLabel})
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#F5F2EB]/55 block">Aktif Kare Hızı</span>
                        <strong className="text-[#D4A359]">
                          {selectedFps} FPS ({activeFpsSpec.frameTimeMs})
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#F5F2EB]/55 block">Video Hızı (Speed)</span>
                        <strong className="text-[#D4A359]">
                          {videoSpeed}x ({activeSpeedSpec.badgeTr})
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#F5F2EB]/55 block">Toplam Kare ({activeClipDuration}sn)</span>
                        <strong className="text-[#F5F2EB]">{totalClipFrames} Kare</strong>
                      </div>
                      <div>
                        <span className="text-[#F5F2EB]/55 block">Boyut &amp; Bitrate</span>
                        <strong className="text-[#F5F2EB]">
                          {generatedVideoSizeBytes
                            ? `${(generatedVideoSizeBytes / (1024 * 1024)).toFixed(2)} MB`
                            : resolutionSpec.estFileSizeMb}{' '}
                          · {resolutionSpec.estBitrateMbps}
                        </strong>
                      </div>
                    </div>

                    {/* FILE FORMAT (MP4, WebM) & VIDEO RESOLUTION (1080p, 4K) SELECTION BAR UNDER VIDEO METRICS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 pb-2 border-b border-[#D4A359]/15">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                          Dosya Formatı (İndirme Çıktısı)
                        </span>
                        <div
                          role="group"
                          aria-label="Dosya Formatı Seçimi"
                          className="inline-flex w-full items-center border border-[#D4A359]/35 rounded overflow-hidden"
                        >
                          {(
                            [
                              { id: 'mp4', label: 'MP4 (H.264 · Reels/TikTok)' },
                              { id: 'webm', label: 'WebM (VP9 · Web Stüdyo)' },
                            ] as const
                          ).map((fmt) => (
                            <button
                              key={fmt.id}
                              type="button"
                              onClick={() => setVideoFileFormat(fmt.id)}
                              className={`flex-1 px-3 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                                videoFileFormat === fmt.id
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {fmt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                          Video Çözünürlüğü (1080p / 4K)
                        </span>
                        <div
                          role="group"
                          aria-label="Video Çözünürlüğü Seçimi"
                          className="inline-flex w-full items-center border border-[#D4A359]/35 rounded overflow-hidden"
                        >
                          {(
                            [
                              { id: '1080p', label: '1080p (1080×1920 FHD)' },
                              { id: '4k', label: '4K (2160×3840 UHD)' },
                            ] as const
                          ).map((res) => (
                            <button
                              key={res.id}
                              type="button"
                              onClick={() => handleResolutionToggle(res.id)}
                              className={`flex-1 px-3 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                                videoResolution === res.id
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {res.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#F5F2EB]/70 pt-1">
                        <span>
                          Aktif İndirme Yapılandırması:{' '}
                          <strong className="text-[#D4A359]">{activeDownloadFileName}</strong>
                        </span>
                        {generatedVideoUrl && (
                          <button
                            type="button"
                            onClick={handleDownloadVideo}
                            className="px-3 py-1 text-[11px] font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>
                              .{videoFileFormat.toUpperCase()} ({resolutionSpec.shortLabel}) İndir
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 5 VIDEO CONCEPTS 'VISUAL QUALITY SCORE' PROGRESSION LINE CHART UNDER VIDEO METRICS */}
                    <div className="border border-[#D4A359]/30 rounded p-3.5 space-y-3 bg-[#0B0A09]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                            5 Video Konsepti · Görsel Kalite Puanı Gelişim Çizgi Grafiği
                          </span>
                          <span className="text-[11px] text-[#F5F2EB]/65">
                            5 farklı ev konsepti ve otomatik ışık modu eşleşmesinin kalite gelişimi (Noktalara tıklayarak konsepte geçebilirsiniz).
                          </span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-[#F5F2EB]/70">
                            Ortalama:{' '}
                            <strong className="text-[#D4A359]">
                              {Math.round(
                                fiveConceptProgression.reduce((acc, item) => acc + item.score, 0) /
                                  fiveConceptProgression.length
                              )}
                              /100
                            </strong>
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                            Aktif: {fiveConceptProgression.find((c) => c.isCurrent)?.code || 'K1'} (
                            {activeQualityReport.overallScore}/100 · {activeLightingHarmony.modeLabelTr} Işık)
                          </span>
                        </div>
                      </div>

                      {/* Compact SVG Line Chart */}
                      {(() => {
                        const chartWidth = 520;
                        const chartHeight = 128;
                        const padLeft = 36;
                        const padRight = 28;
                        const padTop = 22;
                        const padBottom = 30;
                        const usableW = chartWidth - padLeft - padRight;
                        const usableH = chartHeight - padTop - padBottom;
                        const minScore = 65;
                        const maxScore = 100;

                        const coords = fiveConceptProgression.map((pt, idx) => {
                          const x =
                            padLeft +
                            (idx / Math.max(1, fiveConceptProgression.length - 1)) * usableW;
                          const clamped = Math.max(minScore, Math.min(maxScore, pt.score));
                          const y =
                            padTop +
                            usableH -
                            ((clamped - minScore) / (maxScore - minScore)) * usableH;
                          return { ...pt, x, y };
                        });

                        const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(' ');
                        const areaPath =
                          coords.length > 0
                            ? `M ${coords[0].x} ${padTop + usableH} ` +
                              coords.map((c) => `L ${c.x} ${c.y}`).join(' ') +
                              ` L ${coords[coords.length - 1].x} ${padTop + usableH} Z`
                            : '';

                        return (
                          <div className="space-y-2">
                            <svg
                              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                              className="w-full h-32 overflow-visible"
                              role="img"
                              aria-label="5 Video Konsepti Görsel Kalite Puanı Gelişim Çizgi Grafiği"
                            >
                              <defs>
                                <linearGradient id="vesperaGoldArea" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#D4A359" stopOpacity="0.28" />
                                  <stop offset="100%" stopColor="#D4A359" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>

                              {/* Horizontal Reference Grid Lines (70, 85, 100) */}
                              {[70, 85, 100].map((val) => {
                                const gy =
                                  padTop +
                                  usableH -
                                  ((val - minScore) / (maxScore - minScore)) * usableH;
                                return (
                                  <g key={val}>
                                    <line
                                      x1={padLeft}
                                      y1={gy}
                                      x2={chartWidth - padRight}
                                      y2={gy}
                                      stroke="#D4A359"
                                      strokeOpacity="0.16"
                                      strokeDasharray="3 3"
                                    />
                                    <text
                                      x={padLeft - 6}
                                      y={gy + 3}
                                      textAnchor="end"
                                      fill="#F5F2EB"
                                      fillOpacity="0.45"
                                      fontSize="9"
                                      fontFamily="monospace"
                                    >
                                      {val}
                                    </text>
                                  </g>
                                );
                              })}

                              {/* Area Under Line */}
                              {areaPath && <path d={areaPath} fill="url(#vesperaGoldArea)" />}

                              {/* Main Progression Line */}
                              <polyline
                                fill="none"
                                stroke="#D4A359"
                                strokeWidth="2.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={polylinePoints}
                              />

                              {/* 5 Interactive Concept Nodes */}
                              {coords.map((pt) => (
                                <g
                                  key={pt.settingId}
                                  onClick={() => handleSettingChange(pt.settingId)}
                                  className="cursor-pointer"
                                >
                                  {pt.isCurrent && (
                                    <circle
                                      cx={pt.x}
                                      cy={pt.y}
                                      r="9"
                                      fill="#D4A359"
                                      fillOpacity="0.22"
                                      stroke="#D4A359"
                                      strokeWidth="1"
                                    />
                                  )}
                                  <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={pt.isCurrent ? 5 : 3.8}
                                    fill={pt.isCurrent ? '#D4A359' : '#0B0A09'}
                                    stroke="#D4A359"
                                    strokeWidth="2"
                                  />
                                  {/* Score Label Above Node */}
                                  <text
                                    x={pt.x}
                                    y={pt.y - 9}
                                    textAnchor="middle"
                                    fill={pt.isCurrent ? '#D4A359' : '#F5F2EB'}
                                    fontSize="10"
                                    fontWeight="bold"
                                    fontFamily="monospace"
                                  >
                                    {pt.score}
                                  </text>
                                  {/* Concept Label Below Axis */}
                                  <text
                                    x={pt.x}
                                    y={padTop + usableH + 14}
                                    textAnchor="middle"
                                    fill={pt.isCurrent ? '#D4A359' : '#F5F2EB'}
                                    fillOpacity={pt.isCurrent ? '1' : '0.7'}
                                    fontSize="9.5"
                                    fontFamily="monospace"
                                  >
                                    {pt.code}·{pt.shortTitleTr}
                                  </text>
                                  <text
                                    x={pt.x}
                                    y={padTop + usableH + 25}
                                    textAnchor="middle"
                                    fill="#D4A359"
                                    fillOpacity="0.75"
                                    fontSize="8.5"
                                    fontFamily="monospace"
                                  >
                                    ({pt.lightingLabelTr})
                                  </text>
                                </g>
                              ))}
                            </svg>

                            {/* Quick 5-Concept Selector Pills Below Chart */}
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                              {fiveConceptProgression.map((pt) => (
                                <button
                                  key={pt.settingId}
                                  type="button"
                                  onClick={() => handleSettingChange(pt.settingId)}
                                  className={`px-2 py-1.5 rounded border text-left transition-colors cursor-pointer ${
                                    pt.isCurrent
                                      ? 'border-[#D4A359] bg-[#D4A359]/15 text-[#F5F2EB]'
                                      : 'border-[#D4A359]/20 text-[#F5F2EB]/70 hover:border-[#D4A359]/50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-[#D4A359] font-bold">
                                      {pt.code} · {pt.shortTitleTr}
                                    </span>
                                    <span className="font-bold">{pt.score}/100</span>
                                  </div>
                                  <div className="text-[9px] font-mono text-[#F5F2EB]/60 truncate">
                                    Işık: {pt.lightingLabelTr}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* INTERACTIVE WAVEFORM TIMELINE COMPONENT FOR VIDEO TRIM TOOLS (BAŞLANGIÇ / BİTİŞ) */}
                    <div className="border border-[#D4A359]/35 rounded p-3.5 space-y-3.5 bg-[#0B0A09]">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Scissors className="w-3.5 h-3.5 text-[#D4A359]" />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                              İnteraktif Dalga Formu (Waveform) &amp; Video Trim Zaman Çizelgesi
                            </span>
                            <span className="text-[11px] font-mono text-[#F5F2EB]/70">
                              · Kırpma Aralığı: <strong className="text-[#D4A359]">{trimStart.toFixed(1)}sn – {trimEnd.toFixed(1)}sn</strong> ({activeClipDuration.toFixed(1)}sn · {totalClipFrames} Kare)
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F5F2EB]/65">
                            Başlangıç (IN) ve Bitiş (OUT) tutamaçlarını dalga formu üzerinde sürükleyerek veya çubuklara tıklayarak videoyu hangi zaman aralığında kırptığınızı görsel olarak ayarlayın.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (generatedVideoUrl && videoRef.current) {
                                if (videoRef.current.paused) {
                                  if (
                                    videoRef.current.currentTime < trimStart ||
                                    videoRef.current.currentTime >= trimEnd
                                  ) {
                                    videoRef.current.currentTime = trimStart;
                                  }
                                  videoRef.current.play().catch(() => {});
                                  setIsTimelinePreviewPlaying(true);
                                } else {
                                  videoRef.current.pause();
                                  setIsTimelinePreviewPlaying(false);
                                }
                              } else {
                                setIsTimelinePreviewPlaying((prev) => !prev);
                              }
                            }}
                            className="px-3 py-1.5 text-[11px] font-mono font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {isTimelinePreviewPlaying ? (
                              <>
                                <Pause className="w-3 h-3" />
                                <span>Önizlemeyi Durdur ({playheadTime.toFixed(1)}sn)</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3" />
                                <span>Kırpma Aralığını Önizle</span>
                              </>
                            )}
                          </button>

                          {isCustomTrimActive && (
                            <button
                              type="button"
                              onClick={() => {
                                setTrimStart(0);
                                setTrimEnd(videoDuration);
                                setPlayheadTime(0);
                              }}
                              className="px-2.5 py-1.5 text-[11px] font-mono text-[#D4A359] border border-[#D4A359]/40 rounded hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Tam Süre (0–{videoDuration.toFixed(1)}sn)</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setShowVideoTools((prev) => !prev)}
                            className="px-2.5 py-1.5 text-[11px] font-mono text-[#F5F2EB]/75 border border-[#D4A359]/25 rounded hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{showVideoTools ? 'Daralt' : 'Genişlet'}</span>
                            {showVideoTools ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[#D4A359]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[#D4A359]" />
                            )}
                          </button>
                        </div>
                      </div>

                      {showVideoTools && (
                        <div className="space-y-3 pt-1">
                          {/* Quick Trim Range Preset Buttons */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[#F5F2EB]/60 mr-1">Hızlı Kırpma Aralıkları:</span>
                              {[
                                {
                                  label: `Tam Klip (0.0–${videoDuration.toFixed(1)}sn)`,
                                  start: 0,
                                  end: videoDuration,
                                },
                                {
                                  label: 'Reels Hook (0.0–4.5sn)',
                                  start: 0,
                                  end: Math.min(videoDuration, 4.5),
                                },
                                {
                                  label: 'Ana Dönüş & Kart (1.2–6.8sn)',
                                  start: Math.min(1.2, videoDuration - 1),
                                  end: Math.min(videoDuration, 6.8),
                                },
                                {
                                  label: `Final Bakış (2.5–${videoDuration.toFixed(1)}sn)`,
                                  start: Math.min(2.5, videoDuration - 1),
                                  end: videoDuration,
                                },
                              ].map((preset) => {
                                const isPresetActive =
                                  Math.abs(trimStart - preset.start) < 0.08 &&
                                  Math.abs(trimEnd - preset.end) < 0.08;
                                return (
                                  <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => {
                                      setTrimStart(Number(preset.start.toFixed(1)));
                                      setTrimEnd(Number(preset.end.toFixed(1)));
                                      setPlayheadTime(Number(preset.start.toFixed(1)));
                                    }}
                                    className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                                      isPresetActive
                                        ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                                        : 'border-[#D4A359]/30 text-[#F5F2EB]/75 hover:border-[#D4A359]'
                                    }`}
                                  >
                                    {preset.label}
                                  </button>
                                );
                              })}
                            </div>

                            <span className="text-[#D4A359]">
                              {hoveredWaveformBarIndex !== null &&
                              waveformBars[hoveredWaveformBarIndex]
                                ? `${waveformBars[hoveredWaveformBarIndex].timeSec.toFixed(1)}sn · ${
                                    waveformBars[hoveredWaveformBarIndex].phaseLabelTr
                                  } · Yoğunluk %${Math.round(
                                    waveformBars[hoveredWaveformBarIndex].amplitude * 100
                                  )}`
                                : `Oynatma İmleci: ${playheadTime.toFixed(1)}sn / ${videoDuration.toFixed(
                                    1
                                  )}sn`}
                            </span>
                          </div>

                          {/* Interactive Scene Notes Strip Above Waveform (Color-Coded by Category: Kamera, Işık, Hareket, Ses) */}
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                              <span className="text-[#D4A359] font-semibold">
                                Sahne Kurgu Şeridi · Kategori Renk Etiketli (Trim Aralığına Gitmek İçin Sahneye Tıklayın):
                              </span>
                              <div className="flex flex-wrap items-center gap-2 text-[#F5F2EB]/70">
                                {SCENE_NOTE_CATEGORIES.map((cMeta) => (
                                  <span
                                    key={cMeta.id}
                                    className="inline-flex items-center gap-1 text-[9.5px]"
                                  >
                                    <span
                                      style={{ backgroundColor: cMeta.colorHex }}
                                      className="w-2 h-2 rounded-full inline-block"
                                    />
                                    <span>{cMeta.shortLabelTr}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="relative h-7 w-full rounded border border-[#D4A359]/25 bg-[#0B0A09] overflow-hidden flex items-center">
                              {sortedSceneNotes.map((sNote) => {
                                const safeDur = Math.max(1, videoDuration);
                                const leftPct = Math.max(
                                  0,
                                  Math.min(98, (sNote.startSec / safeDur) * 100)
                                );
                                const widthPct = Math.max(
                                  6,
                                  Math.min(
                                    100 - leftPct,
                                    ((sNote.endSec - sNote.startSec) / safeDur) * 100
                                  )
                                );
                                const catMeta = getSceneNoteCategoryMeta(sNote.category);
                                const isSelectedScene =
                                  selectedSceneNoteId === sNote.id ||
                                  (Math.abs(trimStart - sNote.startSec) < 0.12 &&
                                    Math.abs(trimEnd - sNote.endSec) < 0.12);
                                const isFilteredOut =
                                  activeCategoryFilter !== 'all' &&
                                  catMeta.id !== activeCategoryFilter;
                                return (
                                  <button
                                    key={sNote.id}
                                    type="button"
                                    onClick={() => handleSelectSceneNoteOnTimeline(sNote)}
                                    style={{
                                      left: `${leftPct}%`,
                                      width: `${widthPct}%`,
                                      backgroundColor: isSelectedScene
                                        ? catMeta.colorHex
                                        : catMeta.bgTintHex,
                                      borderColor: catMeta.colorHex,
                                      color: isSelectedScene ? '#FFFFFF' : '#F5F2EB',
                                      opacity: isFilteredOut ? 0.3 : 1,
                                    }}
                                    title={`[${catMeta.badgeLabelTr}] ${sNote.titleTr} (${sNote.startSec.toFixed(
                                      1
                                    )}s–${sNote.endSec.toFixed(1)}s): ${sNote.descriptionTr}`}
                                    className={`absolute inset-y-0.5 rounded px-1.5 text-[9.5px] font-mono truncate transition-all cursor-pointer flex items-center justify-between gap-1 border ${
                                      isSelectedScene ? 'font-bold z-10 shadow-sm' : ''
                                    }`}
                                  >
                                    <span className="truncate inline-flex items-center gap-1">
                                      <span
                                        style={{
                                          backgroundColor: isSelectedScene
                                            ? '#FFFFFF'
                                            : catMeta.colorHex,
                                        }}
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                      />
                                      <span>
                                        S{sNote.sceneOrder} [{catMeta.shortLabelTr}]:{' '}
                                        {sNote.titleTr.replace(/^Sahne \d+\s*·\s*/i, '')}
                                      </span>
                                    </span>
                                    <span className="opacity-85 shrink-0">
                                      {sNote.startSec.toFixed(1)}–{sNote.endSec.toFixed(1)}s
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* INTERACTIVE WAVEFORM TIMELINE CANVAS + COLORED 'ACTION INTENSITY & TRANSITION SEVERITY' LAYER */}
                          {(() => {
                            const safeDur = Math.max(1, videoDuration);
                            const startPct = Math.max(0, Math.min(100, (trimStart / safeDur) * 100));
                            const endPct = Math.max(0, Math.min(100, (trimEnd / safeDur) * 100));
                            const playheadPct = Math.max(
                              startPct,
                              Math.min(endPct, (playheadTime / safeDur) * 100)
                            );
                            const isActivelyEditingNote =
                              editingSceneNoteId !== null || isNoteComposerFocused;
                            const isIntensityOverlayVisible =
                              showActionIntensityLayer || isActivelyEditingNote;

                            // Build SVG points for continuous Action Intensity & Scene Transition Curve
                            const curvePoints = activeActionIntensityProfile.bars
                              .map((b, idx) => {
                                const x =
                                  (idx / Math.max(1, activeActionIntensityProfile.bars.length - 1)) *
                                  100;
                                const y = 94 - b.actionIntensity * 80;
                                return `${x.toFixed(2)},${y.toFixed(2)}`;
                              })
                              .join(' ');
                            const areaPoints = `0,100 ${curvePoints} 100,100`;

                            return (
                              <div className="space-y-2 select-none">
                                {/* Action Intensity Layer Control Bar & 4-Tier Color Legend */}
                                <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded border border-[#D4A359]/30 bg-[#0B0A09]">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowActionIntensityLayer((prev) => !prev)
                                      }
                                      className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                                        isIntensityOverlayVisible
                                          ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359]'
                                          : 'border-[#D4A359]/35 text-[#F5F2EB]/75 hover:border-[#D4A359]'
                                      }`}
                                    >
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        Aksiyon Yoğunluğu Katmanı:{' '}
                                        {isIntensityOverlayVisible ? 'AÇIK' : 'KAPALI'}
                                      </span>
                                    </button>

                                    {isActivelyEditingNote && (
                                      <span
                                        style={{
                                          borderColor:
                                            activeActionIntensityProfile.dominantColorHex,
                                          color: activeActionIntensityProfile.dominantColorHex,
                                        }}
                                        className="px-2 py-0.5 text-[10px] font-mono font-bold rounded border"
                                      >
                                        ● CANLI NOT DÜZENLEME · TAHMİNİ GEÇİŞ ŞİDDETİ %
                                        {activeActionIntensityProfile.overallIntensityPct}
                                      </span>
                                    )}

                                    <span className="text-[10px] font-mono text-[#F5F2EB]/75">
                                      Giriş Geçişi:{' '}
                                      <strong className="text-[#D4A359]">
                                        %{activeActionIntensityProfile.entryTransitionSeverityPct}
                                      </strong>{' '}
                                      · Ana Aksiyon:{' '}
                                      <strong className="text-[#D4A359]">
                                        %{activeActionIntensityProfile.coreActionDensityPct}
                                      </strong>{' '}
                                      · Çıkış Geçişi:{' '}
                                      <strong className="text-[#D4A359]">
                                        %{activeActionIntensityProfile.exitTransitionSeverityPct}
                                      </strong>{' '}
                                      · Tepe:{' '}
                                      <strong className="text-[#D4A359]">
                                        {activeActionIntensityProfile.peakTimeSec.toFixed(1)}sn (%
                                        {activeActionIntensityProfile.peakIntensityPct})
                                      </strong>
                                    </span>
                                  </div>

                                  {/* 4-Color Semantic Action Intensity Scale */}
                                  <div className="flex flex-wrap items-center gap-2.5 text-[9.5px] font-mono text-[#F5F2EB]/75">
                                    <span className="inline-flex items-center gap-1">
                                      <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ backgroundColor: '#10B981' }}
                                      />
                                      Düşük/Sabit
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ backgroundColor: '#F59E0B' }}
                                      />
                                      Dengeli Geçiş
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ backgroundColor: '#F97316' }}
                                      />
                                      Yüksek Aksiyon
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ backgroundColor: '#EF4444' }}
                                      />
                                      Keskin Geçiş
                                    </span>
                                  </div>
                                </div>

                                <div
                                  ref={waveformTrackRef}
                                  className="relative h-28 w-full rounded border border-[#D4A359]/35 bg-[#0B0A09] px-2 py-2 flex items-center overflow-hidden"
                                >
                                  {/* Left Trimmed-Out Mask (0 -> trimStart) */}
                                  {startPct > 0.5 && (
                                    <div
                                      style={{ width: `${startPct}%` }}
                                      className="absolute inset-y-0 left-0 bg-[#0B0A09]/85 border-r border-[#D4A359]/40 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
                                    >
                                      {startPct > 10 && (
                                        <span className="text-[9px] font-mono text-[#F5F2EB]/40 uppercase">
                                          Kesildi
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Right Trimmed-Out Mask (trimEnd -> videoDuration) */}
                                  {endPct < 99.5 && (
                                    <div
                                      style={{
                                        left: `${endPct}%`,
                                        width: `${100 - endPct}%`,
                                      }}
                                      className="absolute inset-y-0 right-0 bg-[#0B0A09]/85 border-l border-[#D4A359]/40 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
                                    >
                                      {100 - endPct > 10 && (
                                        <span className="text-[9px] font-mono text-[#F5F2EB]/40 uppercase">
                                          Kesildi
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Active Trim Window Frame + Colored Action Intensity Backdrop */}
                                  <div
                                    style={{
                                      left: `${startPct}%`,
                                      width: `${Math.max(2, endPct - startPct)}%`,
                                      borderColor: isIntensityOverlayVisible
                                        ? activeActionIntensityProfile.dominantColorHex
                                        : undefined,
                                      background: isIntensityOverlayVisible
                                        ? `linear-gradient(90deg, ${activeActionIntensityProfile.dominantColorHex}22 0%, ${activeActionIntensityProfile.dominantColorHex}10 50%, ${activeActionIntensityProfile.dominantColorHex}22 100%)`
                                        : undefined,
                                    }}
                                    className="absolute inset-y-0 border-y-2 border-[#D4A359] bg-[#D4A359]/5 pointer-events-none z-10"
                                  >
                                    {/* Top Floating Telemetry Badges for IN Transition, Peak Action & OUT Transition */}
                                    {isIntensityOverlayVisible && endPct - startPct > 14 && (
                                      <div className="absolute top-1 inset-x-1.5 flex items-center justify-between text-[8.5px] font-mono pointer-events-none">
                                        <span
                                          style={{
                                            backgroundColor:
                                              activeActionIntensityProfile.dominantColorHex,
                                            color: '#FFFFFF',
                                          }}
                                          className="px-1.5 py-0.2 rounded-sm font-bold shadow-sm"
                                        >
                                          GİRİŞ GEÇİŞİ %
                                          {activeActionIntensityProfile.entryTransitionSeverityPct}
                                        </span>
                                        {endPct - startPct > 28 && (
                                          <span className="px-1.5 py-0.2 rounded-sm bg-[#0B0A09]/90 border border-[#D4A359]/40 text-[#F5F2EB] font-semibold">
                                            AKSİYON KATMANI: %
                                            {activeActionIntensityProfile.overallIntensityPct} (
                                            {activeActionIntensityProfile.audioTempo.tempoBpm} BPM)
                                          </span>
                                        )}
                                        <span
                                          style={{
                                            backgroundColor:
                                              activeActionIntensityProfile.dominantColorHex,
                                            color: '#FFFFFF',
                                          }}
                                          className="px-1.5 py-0.2 rounded-sm font-bold shadow-sm"
                                        >
                                          ÇIKIŞ GEÇİŞİ %
                                          {activeActionIntensityProfile.exitTransitionSeverityPct}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* SVG Continuous Action Intensity & Transition Severity Curve Layer */}
                                  {isIntensityOverlayVisible && (
                                    <svg
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
                                    >
                                      <defs>
                                        <linearGradient
                                          id="actionIntensityHeatGrad"
                                          x1="0%"
                                          y1="0%"
                                          x2="0%"
                                          y2="100%"
                                        >
                                          <stop
                                            offset="0%"
                                            stopColor={
                                              activeActionIntensityProfile.dominantColorHex
                                            }
                                            stopOpacity="0.38"
                                          />
                                          <stop
                                            offset="100%"
                                            stopColor={
                                              activeActionIntensityProfile.dominantColorHex
                                            }
                                            stopOpacity="0.03"
                                          />
                                        </linearGradient>
                                      </defs>
                                      <polygon
                                        points={areaPoints}
                                        fill="url(#actionIntensityHeatGrad)"
                                      />
                                      <polyline
                                        fill="none"
                                        stroke={activeActionIntensityProfile.dominantColorHex}
                                        strokeWidth="1.6"
                                        points={curvePoints}
                                      />
                                    </svg>
                                  )}

                                  {/* 48 Interactive Waveform Bars with Colored Action Intensity Layer */}
                                  <div className="relative z-[6] w-full h-full flex items-end justify-between gap-[2px] pt-5 pb-1">
                                    {waveformBars.map((bar, idx) => {
                                      const intensityBar =
                                        activeActionIntensityProfile.bars[idx];
                                      const isInsideTrim =
                                        bar.timeSec >= trimStart - 0.05 &&
                                        bar.timeSec <= trimEnd + 0.05;
                                      const isNearPlayhead =
                                        Math.abs(bar.timeSec - playheadTime) <=
                                        videoDuration / waveformBars.length;
                                      const effectiveAmp =
                                        isIntensityOverlayVisible &&
                                        intensityBar &&
                                        isInsideTrim
                                          ? Math.max(bar.amplitude, intensityBar.actionIntensity)
                                          : bar.amplitude;
                                      const heightPct = Math.round(effectiveAmp * 92);

                                      const zoneLabelTr =
                                        intensityBar?.boundaryZone === 'in-ramp'
                                          ? 'Giriş Geçiş Rampası'
                                          : intensityBar?.boundaryZone === 'out-ramp'
                                          ? 'Çıkış Geçiş Rampası'
                                          : intensityBar?.boundaryZone === 'core'
                                          ? 'Ana Aksiyon Gövdesi'
                                          : 'Trim Dışı';

                                      return (
                                        <button
                                          key={bar.index}
                                          type="button"
                                          onMouseEnter={() =>
                                            setHoveredWaveformBarIndex(bar.index)
                                          }
                                          onMouseLeave={() => setHoveredWaveformBarIndex(null)}
                                          onClick={() => {
                                            const clampedTime = Math.max(
                                              trimStart,
                                              Math.min(trimEnd, bar.timeSec)
                                            );
                                            setPlayheadTime(clampedTime);
                                            if (videoRef.current) {
                                              videoRef.current.currentTime = clampedTime;
                                            }
                                          }}
                                          style={{
                                            height: `${heightPct}%`,
                                            backgroundColor: isNearPlayhead
                                              ? undefined
                                              : isIntensityOverlayVisible &&
                                                isInsideTrim &&
                                                intensityBar
                                              ? intensityBar.colorHex
                                              : undefined,
                                            opacity:
                                              !isInsideTrim && isIntensityOverlayVisible
                                                ? 0.25
                                                : undefined,
                                          }}
                                          title={`${bar.timeSec.toFixed(1)}sn · ${zoneLabelTr} · Aksiyon Yoğunluğu: %${Math.round(
                                            (intensityBar?.actionIntensity || bar.amplitude) * 100
                                          )} (${intensityBar?.levelLabelTr || bar.phaseLabelTr})`}
                                          className={`flex-1 rounded-sm transition-all cursor-pointer relative ${
                                            isNearPlayhead
                                              ? 'bg-[#F5F2EB]'
                                              : isIntensityOverlayVisible && isInsideTrim
                                              ? 'hover:opacity-90'
                                              : isInsideTrim
                                              ? bar.isPeakMoment
                                                ? 'bg-[#D4A359]'
                                                : 'bg-[#D4A359]/75 hover:bg-[#D4A359]'
                                              : 'bg-[#D4A359]/20'
                                          }`}
                                        >
                                          {isIntensityOverlayVisible &&
                                            isInsideTrim &&
                                            intensityBar?.isTransitionBoundary && (
                                              <span
                                                style={{
                                                  backgroundColor: intensityBar.colorHex,
                                                }}
                                                className="absolute -top-1.5 inset-x-0 h-1 rounded-full"
                                              />
                                            )}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Draggable Left Handle (IN / Başlangıç) */}
                                  <div
                                    role="slider"
                                    aria-label="Başlangıç (IN) Kırpma Tutamacı"
                                    aria-valuemin={0}
                                    aria-valuemax={trimEnd - 0.5}
                                    aria-valuenow={trimStart}
                                    tabIndex={0}
                                    onPointerDown={(e) => {
                                      e.stopPropagation();
                                      setActiveTrimDragHandle('start');
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'ArrowLeft') {
                                        setTrimStart((prev) =>
                                          Math.max(0, Number((prev - 0.1).toFixed(1)))
                                        );
                                      } else if (e.key === 'ArrowRight') {
                                        setTrimStart((prev) =>
                                          Math.min(
                                            Number((trimEnd - 0.5).toFixed(1)),
                                            Number((prev + 0.1).toFixed(1))
                                          )
                                        );
                                      }
                                    }}
                                    style={{ left: `calc(${startPct}% - 6px)` }}
                                    className="absolute inset-y-0 w-3 z-20 cursor-ew-resize flex flex-col items-center justify-between group"
                                  >
                                    <div className="px-1 py-0.5 text-[9px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded-sm whitespace-nowrap shadow">
                                      IN {trimStart.toFixed(1)}s
                                    </div>
                                    <div className="w-1 flex-1 bg-[#D4A359] group-hover:w-1.5 transition-all" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4A359] border border-[#0B0A09]" />
                                  </div>

                                  {/* Draggable Playhead Scrubber */}
                                  <div
                                    role="slider"
                                    aria-label="Oynatma İmleci (Playhead)"
                                    aria-valuemin={trimStart}
                                    aria-valuemax={trimEnd}
                                    aria-valuenow={playheadTime}
                                    tabIndex={0}
                                    onPointerDown={(e) => {
                                      e.stopPropagation();
                                      setActiveTrimDragHandle('playhead');
                                    }}
                                    style={{ left: `calc(${playheadPct}% - 1px)` }}
                                    className="absolute inset-y-0 w-0.5 bg-[#F5F2EB] z-20 cursor-pointer flex flex-col items-center justify-between"
                                  >
                                    <div className="w-2 h-2 rotate-45 bg-[#F5F2EB]" />
                                    <div className="w-2 h-2 rounded-full bg-[#F5F2EB]" />
                                  </div>

                                  {/* Draggable Right Handle (OUT / Bitiş) */}
                                  <div
                                    role="slider"
                                    aria-label="Bitiş (OUT) Kırpma Tutamacı"
                                    aria-valuemin={trimStart + 0.5}
                                    aria-valuemax={videoDuration}
                                    aria-valuenow={trimEnd}
                                    tabIndex={0}
                                    onPointerDown={(e) => {
                                      e.stopPropagation();
                                      setActiveTrimDragHandle('end');
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'ArrowLeft') {
                                        setTrimEnd((prev) =>
                                          Math.max(
                                            Number((trimStart + 0.5).toFixed(1)),
                                            Number((prev - 0.1).toFixed(1))
                                          )
                                        );
                                      } else if (e.key === 'ArrowRight') {
                                        setTrimEnd((prev) =>
                                          Math.min(videoDuration, Number((prev + 0.1).toFixed(1)))
                                        );
                                      }
                                    }}
                                    style={{ left: `calc(${endPct}% - 6px)` }}
                                    className="absolute inset-y-0 w-3 z-20 cursor-ew-resize flex flex-col items-center justify-between group"
                                  >
                                    <div className="px-1 py-0.5 text-[9px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded-sm whitespace-nowrap shadow">
                                      OUT {trimEnd.toFixed(1)}s
                                    </div>
                                    <div className="w-1 flex-1 bg-[#D4A359] group-hover:w-1.5 transition-all" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4A359] border border-[#0B0A09]" />
                                  </div>
                                </div>

                                {/* Timecode Ruler Ticks */}
                                <div className="flex items-center justify-between text-[10px] font-mono text-[#F5F2EB]/55 px-1">
                                  {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                                    <span key={pct}>{(pct * videoDuration).toFixed(1)}sn</span>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Fine-Tune Start (IN) & End (OUT) Range Controls + Nudge Buttons */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-[#D4A359]/15">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#F5F2EB]/75 font-mono">
                                  Başlangıç Noktası (IN)
                                </span>
                                <div className="flex items-center gap-1.5 font-mono">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTrimStart((prev) =>
                                        Math.max(0, Number((prev - 0.1).toFixed(1)))
                                      )
                                    }
                                    className="px-1.5 py-0.5 text-[10px] border border-[#D4A359]/35 rounded text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    -0.1s
                                  </button>
                                  <strong className="text-[#D4A359] w-12 text-center">
                                    {trimStart.toFixed(1)} sn
                                  </strong>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTrimStart((prev) =>
                                        Math.min(
                                          Number((trimEnd - 0.5).toFixed(1)),
                                          Number((prev + 0.1).toFixed(1))
                                        )
                                      )
                                    }
                                    className="px-1.5 py-0.5 text-[10px] border border-[#D4A359]/35 rounded text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    +0.1s
                                  </button>
                                </div>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={Math.max(0.5, Number((videoDuration - 0.5).toFixed(1)))}
                                step={0.1}
                                value={trimStart}
                                onChange={(e) =>
                                  setTrimStart(
                                    Math.min(
                                      parseFloat(e.target.value),
                                      Number((trimEnd - 0.5).toFixed(1))
                                    )
                                  )
                                }
                                className="w-full accent-[#D4A359] cursor-pointer"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#F5F2EB]/75 font-mono">
                                  Bitiş Noktası (OUT)
                                </span>
                                <div className="flex items-center gap-1.5 font-mono">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTrimEnd((prev) =>
                                        Math.max(
                                          Number((trimStart + 0.5).toFixed(1)),
                                          Number((prev - 0.1).toFixed(1))
                                        )
                                      )
                                    }
                                    className="px-1.5 py-0.5 text-[10px] border border-[#D4A359]/35 rounded text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    -0.1s
                                  </button>
                                  <strong className="text-[#D4A359] w-12 text-center">
                                    {trimEnd.toFixed(1)} sn
                                  </strong>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTrimEnd((prev) =>
                                        Math.min(videoDuration, Number((prev + 0.1).toFixed(1)))
                                      )
                                    }
                                    className="px-1.5 py-0.5 text-[10px] border border-[#D4A359]/35 rounded text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    +0.1s
                                  </button>
                                </div>
                              </div>
                              <input
                                type="range"
                                min={0.5}
                                max={videoDuration}
                                step={0.1}
                                value={trimEnd}
                                onChange={(e) =>
                                  setTrimEnd(
                                    Math.max(
                                      parseFloat(e.target.value),
                                      Number((trimStart + 0.5).toFixed(1))
                                    )
                                  )
                                }
                                className="w-full accent-[#D4A359] cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 'SAHNE KURGU PANELİ' & KATEGORİ ÖZET ÇUBUĞU (KAMERA, IŞIK, HAREKET, SES) */}
                    <div
                      id="step-04-scene-editor"
                      className="space-y-4 scroll-mt-28"
                    >
                      {studioViewMode === 'simple' && !isAdvancedSceneOpen ? (
                        <div className="border border-[#D4A359]/35 rounded-xl p-5 bg-[#0B0A09] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-[#D4A359]/60 transition-colors">
                          <div className="flex items-center gap-3.5">
                            <div className="p-3 rounded-lg bg-[#D4A359]/15 text-[#D4A359] border border-[#D4A359]/30 shrink-0">
                              <Film className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] font-bold">
                                  Adım 04 · Zaman Çizelgesi &amp; Sahne Kurgusu
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359]/20 text-[#D4A359] rounded border border-[#D4A359]/30">
                                  {sortedSceneNotes.length} Not · {categoryNoteCounts.durations.all.toFixed(1)}sn
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-[#F5F2EB]">
                                Sahne Kurgu, Ses Dalgası ve Dikey Storyboard
                              </h3>
                              <p className="text-xs text-[#F5F2EB]/65 max-w-xl">
                                Kamera açıları, ışık geçişleri, dinamik ses temposu ve sahne notlarını detaylı düzenlemek için kurgu panelini açabilirsiniz.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsAdvancedSceneOpen(true)}
                            className="px-4 py-2.5 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0 cursor-pointer shadow"
                          >
                            <span>Kurgu Panelini Göster</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          {studioViewMode === 'simple' && (
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => setIsAdvancedSceneOpen(false)}
                                className="px-3 py-1.5 text-xs font-semibold text-[#D4A359] border border-[#D4A359]/40 hover:bg-[#D4A359]/10 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <span>Paneli Daralt</span>
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* SAHNE KURGU PANELİ ÜST ÖZET ÇUBUĞU (KAMERA, IŞIK, HAREKET, SES TOPLAM SÜRE VE SAYI) */}
                          <div className="border border-[#D4A359]/45 rounded-lg p-3.5 sm:p-4 bg-[#0B0A09] shadow-sm space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#D4A359]/20">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded bg-[#D4A359]/15 border border-[#D4A359]/30 text-[#D4A359]">
                              <Clock className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                                  Sahne Kurgu Kategori Özeti
                                </span>
                                <span className="px-1.5 py-0.5 text-[9.5px] font-mono font-semibold bg-[#D4A359]/20 text-[#D4A359] rounded border border-[#D4A359]/35">
                                  Kamera · Işık · Hareket · Ses
                                </span>
                              </div>
                              <p className="text-[11px] text-[#F5F2EB]/65">
                                Her kategoriye ait notların toplam kurgu süreleri, sahne sayıları ve yüzde dağılım metrikleri
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                            <div className="px-3 py-1.5 rounded bg-[#0B0A09] border border-[#D4A359]/30 text-right">
                              <span className="text-[9.5px] font-mono text-[#F5F2EB]/60 block uppercase tracking-wider">
                                Toplam Sahne Süresi
                              </span>
                              <div className="flex items-baseline justify-end gap-1.5">
                                <span className="text-sm font-mono font-black text-[#D4A359]">
                                  {categoryNoteCounts.durations.all.toFixed(1)}sn
                                </span>
                                <span className="text-[10px] font-mono text-[#F5F2EB]/70">
                                  ({categoryNoteCounts.counts.all} Not)
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setShowEditingReportModal(true)}
                              className="px-2.5 py-1.5 text-[10px] font-mono font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity inline-flex items-center gap-1 cursor-pointer shadow-sm"
                              title="Sahne kurgusu ve ses dalgası verilerini PDF veya metin dosyası olarak dışa aktar"
                            >
                              <FileDown className="w-3.5 h-3.5" />
                              <span>Kurgu Raporu</span>
                            </button>

                            {activeCategoryFilter !== 'all' && (
                              <button
                                type="button"
                                onClick={() => setActiveCategoryFilter('all')}
                                className="px-2.5 py-1.5 text-[10px] font-mono font-semibold text-[#D4A359] border border-[#D4A359]/40 rounded hover:bg-[#D4A359]/10 transition-colors cursor-pointer"
                              >
                                Filtreyi Sıfırla
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Kategori Süre Dağılım Çizelgesi Şeridi (Segmented Proportional Bar) */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#F5F2EB]/70">
                            <span className="text-[#D4A359]/90 font-semibold uppercase tracking-wider">
                              Kategori Zaman Payı Dağılımı:
                            </span>
                            <span>
                              {categoryNoteCounts.durations.all > 0
                                ? `${categoryNoteCounts.durations.all.toFixed(1)}sn Toplam Kurgu Aralığı`
                                : '0.0sn'}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-[#0B0A09] rounded-full overflow-hidden flex border border-[#D4A359]/25">
                            {SCENE_NOTE_CATEGORIES.map((cMeta) => {
                              const totalAll = Math.max(0.1, categoryNoteCounts.durations.all);
                              const catDur = categoryNoteCounts.durations[cMeta.id] || 0;
                              const pct = Math.max(0, Math.min(100, (catDur / totalAll) * 100));
                              if (pct <= 0) return null;
                              return (
                                <div
                                  key={cMeta.id}
                                  style={{
                                    width: `${pct}%`,
                                    backgroundColor: cMeta.colorHex,
                                  }}
                                  className="h-full transition-all duration-300 cursor-pointer hover:brightness-125"
                                  title={`${cMeta.shortLabelTr}: ${catDur.toFixed(1)}sn (%${pct.toFixed(0)})`}
                                  onClick={() =>
                                    setActiveCategoryFilter((prev) =>
                                      prev === cMeta.id ? 'all' : cMeta.id
                                    )
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* 4 Kategori Özet Kartları: Kamera, Işık, Hareket, Ses */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                          {SCENE_NOTE_CATEGORIES.map((cMeta) => {
                            const count = categoryNoteCounts.counts[cMeta.id] || 0;
                            const totalSec = categoryNoteCounts.durations[cMeta.id] || 0;
                            const totalAll = Math.max(0.1, categoryNoteCounts.durations.all);
                            const sharePct = ((totalSec / totalAll) * 100).toFixed(0);
                            const avgSec = count > 0 ? (totalSec / count).toFixed(1) : '0.0';
                            const isFiltered = activeCategoryFilter === cMeta.id;

                            const renderCatIcon = () => {
                              switch (cMeta.id) {
                                case 'kamera':
                                  return <Camera className="w-3.5 h-3.5" />;
                                case 'isik':
                                  return <Sparkles className="w-3.5 h-3.5" />;
                                case 'hareket':
                                  return <Activity className="w-3.5 h-3.5" />;
                                case 'ses':
                                  return <Volume2 className="w-3.5 h-3.5" />;
                                default:
                                  return <Layers className="w-3.5 h-3.5" />;
                              }
                            };

                            return (
                              <button
                                key={cMeta.id}
                                type="button"
                                onClick={() =>
                                  setActiveCategoryFilter((prev) =>
                                    prev === cMeta.id ? 'all' : cMeta.id
                                  )
                                }
                                style={{
                                  borderColor: isFiltered ? cMeta.colorHex : `${cMeta.colorHex}55`,
                                  backgroundColor: isFiltered
                                    ? `${cMeta.colorHex}18`
                                    : undefined,
                                }}
                                className={`p-2.5 rounded border text-left transition-all cursor-pointer relative overflow-hidden group hover:border-opacity-100 bg-[#0B0A09] ${
                                  isFiltered
                                    ? 'ring-1 shadow-sm'
                                    : 'hover:bg-[#D4A359]/10'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                  <div
                                    style={{ color: cMeta.textHex }}
                                    className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider"
                                  >
                                    <span
                                      style={{
                                        backgroundColor: `${cMeta.colorHex}25`,
                                        borderColor: `${cMeta.colorHex}66`,
                                      }}
                                      className="p-1 rounded border inline-flex items-center justify-center shrink-0"
                                    >
                                      {renderCatIcon()}
                                    </span>
                                    <span className="truncate">{cMeta.shortLabelTr}</span>
                                  </div>
                                  <span
                                    style={{
                                      backgroundColor: `${cMeta.colorHex}22`,
                                      color: cMeta.textHex,
                                      borderColor: `${cMeta.colorHex}44`,
                                    }}
                                    className="px-1.5 py-0.5 text-[9.5px] font-mono font-bold rounded border shrink-0"
                                  >
                                    {count} Not
                                  </span>
                                </div>

                                <div className="space-y-0.5">
                                  <div className="flex items-baseline justify-between gap-1">
                                    <span className="text-[10px] font-mono text-[#F5F2EB]/60">
                                      Toplam Süre:
                                    </span>
                                    <span
                                      style={{ color: cMeta.textHex }}
                                      className="text-sm font-mono font-black"
                                    >
                                      {totalSec.toFixed(1)}sn
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between text-[9.5px] font-mono text-[#F5F2EB]/55">
                                    <span>Pay: %{sharePct}</span>
                                    <span>Ort: {avgSec}sn/not</span>
                                  </div>
                                </div>

                                <div
                                  style={{ backgroundColor: `${cMeta.colorHex}25` }}
                                  className="w-full h-1 rounded-full mt-2 overflow-hidden"
                                >
                                  <div
                                    style={{
                                      width: `${sharePct}%`,
                                      backgroundColor: cMeta.colorHex,
                                    }}
                                    className="h-full rounded-full transition-all duration-300"
                                  />
                                </div>

                                {isFiltered && (
                                  <div
                                    style={{ color: cMeta.textHex }}
                                    className="mt-1 text-[9px] font-mono font-semibold text-right"
                                  >
                                    ✓ Aktif Filtre
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* SAHNE KURGU PANELİ ANA GÖVDESİ */}
                      <div className="border border-[#D4A359]/40 rounded p-4 space-y-4 bg-[#0B0A09]">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#D4A359]/20 pb-3">
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Film className="w-4 h-4 text-[#D4A359]" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                              Sahne Kurgu Paneli · Kategori Filtresi, Gerçek Zamanlı Ses Dalgası &amp; Dikey Storyboard
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                              {sortedSceneNotes.length} Sahne Notu
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F5F2EB]/70">
                            Sahne notlarını <strong className="text-[#60A5FA]">Kamera</strong>, <strong className="text-[#FBBF24]">Işık</strong>, <strong className="text-[#34D399]">Hareket</strong> ve <strong className="text-[#C084FC]">Ses</strong> kategorilerine göre renkli etiketleyin, filtreleyin ve her notun altında gerçek zamanlı <strong className="text-[#D4A359]">Ses Dalgası Zaman Çizelgesi</strong>&apos;ni inceleyin.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSyncSceneNotesToPrompt((prev) => !prev)}
                            className={`px-2.5 py-1.5 text-[10px] font-mono font-semibold rounded border transition-colors cursor-pointer ${
                              syncSceneNotesToPrompt
                                ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359]'
                                : 'border-[#D4A359]/35 text-[#F5F2EB]/75 hover:border-[#D4A359]'
                            }`}
                          >
                            {syncSceneNotesToPrompt
                              ? 'Prompt Senkronu: AÇIK'
                              : 'Prompt Senkronu: KAPALI'}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategoryFilter('all');
                              handleResetDefaultSceneNotes();
                            }}
                            className="px-2.5 py-1.5 text-[10px] font-mono text-[#D4A359] border border-[#D4A359]/35 rounded hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Varsayılan 4 Kategori Sahnesi</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const edlText = sortedSceneNotes
                                .map((n, idx) => {
                                  const catMeta = getSceneNoteCategoryMeta(n.category);
                                  const rec = deriveSceneAudioTempoRecommendation({
                                    descriptionTr: n.descriptionTr,
                                    cameraNoteTr: n.cameraNoteTr,
                                    titleTr: n.titleTr,
                                    category: n.category,
                                    startSec: n.startSec,
                                    endSec: n.endSec,
                                    turnAngle,
                                    videoSpeed,
                                    motionIntensity,
                                    overrideSfxPresetId: n.selectedSfxPresetId || 'auto',
                                    overrideTempoBpm: n.customTempoBpm,
                                  });
                                  return `[SAHNE 0${idx + 1} | KATEGORİ: ${catMeta.badgeLabelTr} | ${n.startSec.toFixed(1)}s - ${n.endSec.toFixed(1)}s | Kare ${Math.round(
                                    n.startSec * selectedFps
                                  )}-${Math.round(n.endSec * selectedFps)} | ${
                                    n.cameraNoteTr
                                  } | Ses Yoğunluğu: %${rec.intensityPct} (${rec.peakDbFs} dBFS) | Tempo: ${rec.tempoBpm} BPM | SFX: ${rec.sfxTitleTr}]\nTR Açıklama: ${n.descriptionTr}\nEN Prompt: ${n.promptDirectiveEn}`;
                                })
                                .join('\n\n');
                              handleCopyText(edlText, 'copy-scene-edl');
                            }}
                            className="px-2.5 py-1.5 text-[10px] font-mono text-[#D4A359] border border-[#D4A359]/35 rounded hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                          >
                            {copiedTarget === 'copy-scene-edl' ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Kurgu Listesi Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <FileText className="w-3 h-3" />
                                <span>Kurgu Listesini (EDL) Kopyala</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowEditingReportModal(true)}
                            className="px-3 py-1.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 inline-flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                            title="Sahne notlarını ve ses dalgası verilerini PDF veya yapılandırılmış metin olarak dışa aktar"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            <span>Kurgu Raporu Oluştur (PDF &amp; Metin)</span>
                          </button>
                        </div>
                      </div>

                      {/* CATEGORY FILTER CONTROL BAR (KAMERA, IŞIK, HAREKET, SES) */}
                      <div className="border border-[#D4A359]/30 rounded p-3 bg-[#0B0A09] space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#D4A359]" />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5F2EB]">
                              Kategori Filtreleme &amp; Renk Etiket Kontrol Çubuğu
                            </span>
                            <span className="text-[10px] font-mono text-[#F5F2EB]/60">
                              (Gösterilen: {filteredSceneNotes.length}/{sortedSceneNotes.length} Sahne)
                            </span>
                          </div>

                          {activeCategoryFilter !== 'all' && (
                            <button
                              type="button"
                              onClick={() => setActiveCategoryFilter('all')}
                              className="text-[10px] font-mono text-[#D4A359] hover:underline cursor-pointer self-start sm:self-auto"
                            >
                              Filtreyi Temizle · Tüm Kategorileri Göster ({sortedSceneNotes.length})
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveCategoryFilter('all')}
                            className={`px-3 py-2 rounded border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              activeCategoryFilter === 'all'
                                ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold shadow-sm'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/80 border-[#D4A359]/30 hover:border-[#D4A359]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-[10.5px] font-mono uppercase tracking-wider truncate">
                                Tüm Notlar
                              </div>
                              <div
                                className={`text-[9.5px] font-mono ${
                                  activeCategoryFilter === 'all'
                                    ? 'text-[#0B0A09]/80'
                                    : 'text-[#F5F2EB]/55'
                                }`}
                              >
                                {categoryNoteCounts.durations.all.toFixed(1)}sn toplam
                              </div>
                            </div>
                            <span
                              className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${
                                activeCategoryFilter === 'all'
                                  ? 'bg-[#0B0A09] text-[#D4A359]'
                                  : 'bg-[#D4A359]/15 text-[#D4A359]'
                              }`}
                            >
                              {categoryNoteCounts.counts.all}
                            </span>
                          </button>

                          {SCENE_NOTE_CATEGORIES.map((cat) => {
                            const isSelectedCat = activeCategoryFilter === cat.id;
                            const count = categoryNoteCounts.counts[cat.id];
                            const totalSec = categoryNoteCounts.durations[cat.id];
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() =>
                                  setActiveCategoryFilter((prev) =>
                                    prev === cat.id ? 'all' : cat.id
                                  )
                                }
                                style={{
                                  borderColor: isSelectedCat ? cat.colorHex : `${cat.colorHex}55`,
                                  backgroundColor: isSelectedCat ? cat.colorHex : cat.bgTintHex,
                                  color: isSelectedCat ? '#FFFFFF' : '#F5F2EB',
                                }}
                                className="px-3 py-2 rounded border text-left transition-all cursor-pointer flex items-center justify-between gap-2 hover:opacity-95"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider truncate">
                                    <span
                                      style={{
                                        backgroundColor: isSelectedCat ? '#FFFFFF' : cat.colorHex,
                                      }}
                                      className="w-2 h-2 rounded-full shrink-0"
                                    />
                                    <span>{cat.shortLabelTr}</span>
                                  </div>
                                  <div
                                    className={`text-[9.5px] font-mono truncate ${
                                      isSelectedCat ? 'text-white/85' : 'text-[#F5F2EB]/65'
                                    }`}
                                  >
                                    {totalSec.toFixed(1)}sn · {cat.badgeLabelTr}
                                  </div>
                                </div>
                                <span
                                  style={{
                                    backgroundColor: isSelectedCat
                                      ? 'rgba(11, 10, 9, 0.75)'
                                      : cat.colorHex,
                                    color: '#FFFFFF',
                                  }}
                                  className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded shrink-0"
                                >
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {sceneNoteBannerTr && (
                        <div className="border border-[#D4A359] rounded px-3 py-2 flex items-center justify-between gap-2 text-xs text-[#D4A359] bg-[#0B0A09]">
                          <span>{sceneNoteBannerTr}</span>
                          <button
                            type="button"
                            onClick={() => setSceneNoteBannerTr(null)}
                            className="text-[10px] font-mono underline cursor-pointer shrink-0"
                          >
                            Kapat
                          </button>
                        </div>
                      )}

                      {/* SCENE NOTE COMPOSER FOR ACTIVE TRIM RANGE + LIVE COLORED ACTION INTENSITY WAVEFORM LAYER & REAL-TIME AUDIO SOUNDWAVE */}
                      {(() => {
                        const draftCatMeta = getSceneNoteCategoryMeta(noteDraftCategory);
                        const composerAudioTempo = activeActionIntensityProfile.audioTempo;
                        const isComposerAuditioning =
                          playingAudioPreviewId === 'composer-audio-preview';
                        const composerPlayheadRatio = isComposerAuditioning
                          ? auditionPlayheadPct
                          : playheadTime >= trimStart && playheadTime <= trimEnd
                          ? Math.round(
                              ((playheadTime - trimStart) /
                                Math.max(0.5, trimEnd - trimStart)) *
                                100
                            )
                          : 0;

                        return (
                          <div
                            onFocusCapture={() => {
                              setIsNoteComposerFocused(true);
                              setShowActionIntensityLayer(true);
                            }}
                            onBlurCapture={() => setIsNoteComposerFocused(false)}
                            style={{ borderColor: `${draftCatMeta.colorHex}66` }}
                            className="border rounded p-3.5 space-y-3.5 bg-[#0B0A09]"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  style={{
                                    backgroundColor: draftCatMeta.colorHex,
                                    color: '#FFFFFF',
                                  }}
                                  className="px-2 py-0.5 text-[10px] font-mono font-bold rounded"
                                >
                                  {editingSceneNoteId
                                    ? `SAHNE NOTU DÜZENLEME [${draftCatMeta.badgeLabelTr}]`
                                    : `AKTİF TRİM ARALIĞINA NOT ATA [${draftCatMeta.badgeLabelTr}]`}
                                </span>
                                <span className="text-xs font-mono font-bold text-[#D4A359]">
                                  Seçili Aralık: {trimStart.toFixed(1)}sn – {trimEnd.toFixed(1)}sn (
                                  {activeClipDuration.toFixed(1)}sn · Kare{' '}
                                  {Math.round(trimStart * selectedFps)}–
                                  {Math.round(trimEnd * selectedFps)})
                                </span>
                              </div>

                              {/* Quick Trim Segment Target Selector */}
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                                <span className="text-[#F5F2EB]/55">Aralık Seç:</span>
                                {[
                                  {
                                    label: 'Faz 1 (0.0–2.0s)',
                                    s: 0.0,
                                    e: Math.min(2.0, videoDuration),
                                  },
                                  {
                                    label: 'Faz 2 (2.0–4.4s)',
                                    s: Math.min(2.0, videoDuration - 1),
                                    e: Math.min(4.4, videoDuration),
                                  },
                                  {
                                    label: 'Faz 3 (4.4–6.4s)',
                                    s: Math.min(4.4, videoDuration - 1),
                                    e: Math.min(6.4, videoDuration),
                                  },
                                  {
                                    label: `Faz 4 (6.4–${videoDuration.toFixed(1)}s)`,
                                    s: Math.min(6.4, videoDuration - 0.5),
                                    e: videoDuration,
                                  },
                                ].map((seg) => (
                                  <button
                                    key={seg.label}
                                    type="button"
                                    onClick={() => {
                                      setShowActionIntensityLayer(true);
                                      setTrimStart(Number(seg.s.toFixed(1)));
                                      setTrimEnd(Number(seg.e.toFixed(1)));
                                      setPlayheadTime(Number(seg.s.toFixed(1)));
                                    }}
                                    className="px-2 py-0.5 rounded border border-[#D4A359]/30 text-[#F5F2EB]/75 hover:border-[#D4A359] hover:text-[#D4A359] cursor-pointer"
                                  >
                                    {seg.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 6 One-Click Quick Scene Note Templates */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-[#F5F2EB]/60 block">
                                Hızlı Sahne Notu Şablonları (Tek Tıkla Doldur):
                              </span>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {SCENE_NOTE_QUICK_TEMPLATES.map((tpl) => {
                                  const tplCat = getSceneNoteCategoryMeta(tpl.category);
                                  return (
                                    <button
                                      key={tpl.id}
                                      type="button"
                                      onClick={() => handleApplyQuickTemplateToDraft(tpl)}
                                      style={{
                                        borderColor: `${tplCat.colorHex}66`,
                                        color: tplCat.textHex,
                                      }}
                                      className="px-2.5 py-1 text-[10px] font-mono rounded border bg-[#0B0A09] hover:opacity-90 transition-opacity cursor-pointer"
                                    >
                                      {tpl.labelTr}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Color-Coded Category Picker (Kamera, Işık, Hareket, Ses) + Title & Camera Note Inputs */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                              <div className="lg:col-span-5 space-y-1">
                                <label className="block text-[10px] font-mono uppercase text-[#F5F2EB]/65">
                                  Atanan Not Kategorisi (Renk Etiketi Seçin)
                                </label>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {SCENE_NOTE_CATEGORIES.map((cat) => {
                                    const isActiveCat = draftCatMeta.id === cat.id;
                                    return (
                                      <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setNoteDraftCategory(cat.id)}
                                        style={{
                                          backgroundColor: isActiveCat
                                            ? cat.colorHex
                                            : cat.bgTintHex,
                                          borderColor: cat.colorHex,
                                          color: isActiveCat ? '#FFFFFF' : cat.textHex,
                                        }}
                                        className="px-2 py-1.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all"
                                      >
                                        <span
                                          style={{
                                            backgroundColor: isActiveCat
                                              ? '#FFFFFF'
                                              : cat.colorHex,
                                          }}
                                          className="w-1.5 h-1.5 rounded-full shrink-0"
                                        />
                                        <span>{cat.shortLabelTr}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="lg:col-span-4 space-y-1">
                                <label className="block text-[10px] font-mono uppercase text-[#F5F2EB]/65">
                                  Sahne Başlığı
                                </label>
                                <input
                                  type="text"
                                  value={noteDraftTitleTr}
                                  onChange={(e) => setNoteDraftTitleTr(e.target.value)}
                                  placeholder="Ör: Sahne 02 · 3 Satır Kağıt Odak"
                                  className="w-full px-2.5 py-1.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                                />
                              </div>

                              <div className="lg:col-span-3 space-y-1">
                                <label className="block text-[10px] font-mono uppercase text-[#F5F2EB]/65">
                                  Kamera / Lens Notu
                                </label>
                                <input
                                  type="text"
                                  value={noteDraftCameraNoteTr}
                                  onChange={(e) => setNoteDraftCameraNoteTr(e.target.value)}
                                  placeholder="Ör: 28mm iPhone · 15° Flaş"
                                  className="w-full px-2.5 py-1.5 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                                />
                              </div>
                            </div>

                            {/* Text Description Textarea for the Trim Range */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <label className="uppercase text-[#D4A359] font-semibold">
                                  Trim Aralığı Metin Açıklaması ({trimStart.toFixed(1)}sn –{' '}
                                  {trimEnd.toFixed(1)}sn Sahne Kurgu Notu)
                                </label>
                                <span className="text-[#F5F2EB]/55">
                                  Açıklama, kategori ve ses seçimi değiştikçe aşağıdaki ses dalgası gerçek zamanlı güncellenir
                                </span>
                              </div>
                              <textarea
                                rows={2}
                                value={noteDraftDescriptionTr}
                                onChange={(e) => setNoteDraftDescriptionTr(e.target.value)}
                                placeholder="Bu trim aralığında karakterin hareketini, doğrulama kağıdı tutuşunu, kamera açısını veya ışık detayını yazın..."
                                className="w-full px-3 py-2 text-xs bg-[#0B0A09] border border-[#D4A359]/30 rounded text-[#F5F2EB] focus:outline-none focus:border-[#D4A359]"
                              />
                            </div>

                            {/* LIVE SYNCHRONIZED COLORED 'ACTION INTENSITY' & REAL-TIME 'AUDIO SOUNDWAVE TIMELINE' FOR THE ACTIVE NOTE DRAFT */}
                            <div
                              style={{
                                borderColor: `${activeActionIntensityProfile.dominantColorHex}66`,
                              }}
                              className="border rounded p-3 space-y-3 bg-[#0B0A09]"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <Activity
                                    className="w-3.5 h-3.5"
                                    style={{
                                      color: activeActionIntensityProfile.dominantColorHex,
                                    }}
                                  />
                                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5F2EB]">
                                    Düzenlenen Not · Aksiyon Yoğunluğu &amp; Gerçek Zamanlı Ses Dalgası Önizlemesi
                                  </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        activeActionIntensityProfile.dominantColorHex,
                                      color: '#FFFFFF',
                                    }}
                                    className="px-2 py-0.5 text-[10px] font-mono font-bold rounded"
                                  >
                                    %{activeActionIntensityProfile.overallIntensityPct} ·{' '}
                                    {activeActionIntensityProfile.dominantLevelLabelTr}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={handleSmoothTransitionIntensity}
                                    className="px-2.5 py-1 text-[10px] font-mono font-semibold border border-[#D4A359]/40 rounded text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    Geçiş Şiddetini Yumuşat (Ease-In-Out)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAuditionSceneAudioTempo(
                                        composerAudioTempo,
                                        'composer-audio-preview',
                                        { startSec: trimStart, endSec: trimEnd }
                                      )
                                    }
                                    className="px-2.5 py-1 text-[10px] font-mono font-semibold border border-[#D4A359]/40 rounded text-[#D4A359] hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                    <span>
                                      {isComposerAuditioning
                                        ? `Ses Dalgası Çalıyor (%${auditionPlayheadPct})`
                                        : `Sesi Dinle (${composerAudioTempo.tempoBpm} BPM)`}
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleInjectAudioTempoToNoteDraft}
                                    className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 cursor-pointer"
                                  >
                                    + Ses &amp; Tempo Önerisini Nota Ekle
                                  </button>
                                </div>
                              </div>

                              {/* SFX Preset & Tempo Selector for the Active Composer Draft */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#D4A359]/15">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-[10px] font-mono text-[#F5F2EB]/65">
                                    Ses Efekti (SFX) Profili:
                                  </span>
                                  {SCENE_AUDIO_SFX_PRESETS.map((preset) => {
                                    const isSelectedPreset = noteDraftSfxPresetId === preset.id;
                                    return (
                                      <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => {
                                          setNoteDraftSfxPresetId(preset.id);
                                          if (preset.id === 'auto') {
                                            setNoteDraftCustomTempoBpm(undefined);
                                          } else {
                                            setNoteDraftCustomTempoBpm(preset.defaultBpm);
                                          }
                                        }}
                                        className={`px-2 py-0.5 text-[9.5px] font-mono rounded border cursor-pointer transition-colors ${
                                          isSelectedPreset
                                            ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                                            : 'border-[#D4A359]/30 text-[#F5F2EB]/75 hover:border-[#D4A359]'
                                        }`}
                                      >
                                        {preset.shortLabelTr}
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                  <span className="text-[#F5F2EB]/65">Tempo:</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setNoteDraftCustomTempoBpm(
                                        Math.max(64, composerAudioTempo.tempoBpm - 5)
                                      )
                                    }
                                    className="px-1.5 py-0.5 rounded border border-[#D4A359]/35 text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    -5 BPM
                                  </button>
                                  <strong className="text-[#D4A359]">
                                    {composerAudioTempo.tempoBpm} BPM
                                  </strong>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setNoteDraftCustomTempoBpm(
                                        Math.min(156, composerAudioTempo.tempoBpm + 5)
                                      )
                                    }
                                    className="px-1.5 py-0.5 rounded border border-[#D4A359]/35 text-[#D4A359] hover:border-[#D4A359] cursor-pointer"
                                  >
                                    +5 BPM
                                  </button>
                                </div>
                              </div>

                              {/* Live Mirrored Audio Soundwave Timeline inside the Note Composer */}
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#F5F2EB]/75">
                                  <span>
                                    Canlı Ses Dalgası Zaman Çizelgesi ({trimStart.toFixed(1)}s–
                                    {trimEnd.toFixed(1)}s) ·{' '}
                                    <strong style={{ color: draftCatMeta.textHex }}>
                                      {composerAudioTempo.sfxTitleTr}
                                    </strong>
                                  </span>
                                  <span>
                                    Tepe: <strong className="text-[#D4A359]">{composerAudioTempo.peakDbFs} dBFS</strong> · Ort:{' '}
                                    <strong className="text-[#D4A359]">{composerAudioTempo.avgLufs} LUFS</strong> · Ritim:{' '}
                                    <strong className="text-[#D4A359]">{composerAudioTempo.beatCountInClip} Vuruş</strong>
                                  </span>
                                </div>

                                <div className="relative h-14 w-full rounded border border-[#D4A359]/30 bg-[#0B0A09] px-2 py-1.5 flex items-center justify-between gap-[2px] overflow-hidden">
                                  {/* Horizontal 0dB Center Axis Line */}
                                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D4A359]/20 pointer-events-none" />

                                  {/* Live Playhead Cursor inside Composer Soundwave */}
                                  {composerPlayheadRatio > 0 && (
                                    <div
                                      style={{ left: `${composerPlayheadRatio}%` }}
                                      className="absolute inset-y-0 w-0.5 bg-[#F5F2EB] z-20 pointer-events-none"
                                    />
                                  )}

                                  {composerAudioTempo.soundwaveBars.map((sBar) => {
                                    const halfHeightPct = Math.max(
                                      14,
                                      Math.round(sBar.amplitude * 48)
                                    );
                                    return (
                                      <button
                                        key={sBar.index}
                                        type="button"
                                        onClick={() => {
                                          setPlayheadTime(sBar.timeSec);
                                          if (videoRef.current) {
                                            videoRef.current.currentTime = sBar.timeSec;
                                          }
                                        }}
                                        title={`${sBar.timeSec.toFixed(2)}sn · Ses Yoğunluğu: %${Math.round(
                                          sBar.amplitude * 100
                                        )} (${sBar.dbFs} dBFS) · ${sBar.phaseLabelTr}`}
                                        className="flex-1 h-full flex flex-col items-center justify-center gap-[1px] cursor-pointer group relative z-10"
                                      >
                                        {sBar.isBeatMarker && (
                                          <span
                                            style={{ backgroundColor: draftCatMeta.colorHex }}
                                            className="absolute top-0 w-1 h-1 rounded-full"
                                          />
                                        )}
                                        <span
                                          style={{
                                            height: `${halfHeightPct}%`,
                                            backgroundColor: sBar.barColorHex,
                                          }}
                                          className="w-full rounded-t-xs transition-all group-hover:opacity-100 opacity-90"
                                        />
                                        <span
                                          style={{
                                            height: `${Math.max(10, Math.round(halfHeightPct * 0.72))}%`,
                                            backgroundColor: sBar.barColorHex,
                                            opacity: 0.45,
                                          }}
                                          className="w-full rounded-b-xs transition-all"
                                        />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <p className="text-[10.5px] font-mono text-[#F5F2EB]/70">
                                {activeActionIntensityProfile.transitionDiagnosticTr}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <span className="text-[10px] font-mono text-[#F5F2EB]/60">
                                İpucu: Kategori rengini ve ses/tempo profilini seçip bu trim aralığına sahne notu olarak kaydedebilirsiniz.
                              </span>

                              <div className="flex items-center gap-2">
                                {editingSceneNoteId && (
                                  <button
                                    type="button"
                                    onClick={() => setEditingSceneNoteId(null)}
                                    className="px-3 py-1.5 text-xs font-mono text-[#F5F2EB]/75 border border-[#D4A359]/30 rounded hover:border-[#D4A359] cursor-pointer"
                                  >
                                    İptal
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={handleAssignSceneNoteToCurrentTrim}
                                  style={{
                                    backgroundColor: draftCatMeta.colorHex,
                                    color: '#FFFFFF',
                                  }}
                                  className="px-3.5 py-1.5 text-xs font-mono font-bold rounded hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>
                                    {editingSceneNoteId
                                      ? `[${draftCatMeta.badgeLabelTr}] Sahne Notunu Güncelle (${trimStart.toFixed(1)}s–${trimEnd.toFixed(1)}s)`
                                      : `[${draftCatMeta.badgeLabelTr}] Bu Trim Aralığına Not Ata (${trimStart.toFixed(1)}s–${trimEnd.toFixed(1)}s)`}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* VERTICAL DRAG-AND-DROP STORYBOARD VIEW + COLOR-TAGGED CATEGORY NOTES + REAL-TIME AUDIO SOUNDWAVE TIMELINE UNDER EACH NOTE */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono text-[#D4A359] font-bold uppercase tracking-wider block">
                              Dikey Storyboard &amp; Kategori Etiketli Sahne Notları ({filteredSceneNotes.length} / {sortedSceneNotes.length} Sahne)
                            </span>
                            <span className="text-[10.5px] font-mono text-[#F5F2EB]/65 block">
                              Her sahne notunun altında seçilen ses efekti (SFX) ve tempo (BPM) için gerçek zamanlı <strong className="text-[#D4A359]">Ses Dalgası Zaman Çizelgesi</strong> yer alır; çubuklara tıklayarak sesi ve zamanı inceleyin.
                            </span>
                          </div>

                          <div className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden shrink-0">
                            <button
                              type="button"
                              onClick={() => setStoryboardViewMode('vertical-storyboard')}
                              className={`px-2.5 py-1 text-[10px] font-mono font-semibold cursor-pointer ${
                                storyboardViewMode === 'vertical-storyboard'
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              Dikey Storyboard (Sürükle &amp; Bırak)
                            </button>
                            <button
                              type="button"
                              onClick={() => setStoryboardViewMode('compact-cards')}
                              className={`px-2.5 py-1 text-[10px] font-mono font-semibold cursor-pointer ${
                                storyboardViewMode === 'compact-cards'
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              Kompakt Liste
                            </button>
                          </div>
                        </div>

                        {filteredSceneNotes.length === 0 ? (
                          <div className="border border-[#D4A359]/30 rounded p-6 text-center space-y-2 bg-[#0B0A09]">
                            <p className="text-xs font-mono text-[#F5F2EB]/75">
                              Seçili kategori filtresinde (
                              <strong className="text-[#D4A359]">
                                {activeCategoryFilter.toUpperCase()}
                              </strong>
                              ) henüz sahne notu bulunmuyor.
                            </p>
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveCategoryFilter('all')}
                                className="px-3 py-1.5 text-xs font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded cursor-pointer"
                              >
                                Tüm Kategorileri Göster ({sortedSceneNotes.length})
                              </button>
                              {activeCategoryFilter !== 'all' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNoteDraftCategory(activeCategoryFilter);
                                    setActiveCategoryFilter('all');
                                  }}
                                  className="px-3 py-1.5 text-xs font-mono border border-[#D4A359]/40 text-[#D4A359] rounded cursor-pointer"
                                >
                                  + Bu Kategoride Not Oluştur
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="relative space-y-3">
                            {filteredSceneNotes.map((note) => {
                              const idx = sortedSceneNotes.findIndex((n) => n.id === note.id);
                              const catMeta = getSceneNoteCategoryMeta(note.category);
                              const isTrimMatched =
                                Math.abs(trimStart - note.startSec) < 0.12 &&
                                Math.abs(trimEnd - note.endSec) < 0.12;
                              const isEditingThisNote = editingSceneNoteId === note.id;
                              const isPlayheadHere =
                                playheadTime >= note.startSec - 0.05 &&
                                playheadTime <= note.endSec + 0.05;
                              const startFrame = Math.round(note.startSec * selectedFps);
                              const endFrame = Math.round(note.endSec * selectedFps);
                              const clipDur = Math.max(0.5, note.endSec - note.startSec);

                              // Compute per-note dynamic Action Intensity SFX, Tempo & 28-Bar Audio Soundwave Timeline
                              const noteAudioTempo = deriveSceneAudioTempoRecommendation({
                                descriptionTr: note.descriptionTr,
                                cameraNoteTr: note.cameraNoteTr,
                                titleTr: note.titleTr,
                                category: note.category,
                                startSec: note.startSec,
                                endSec: note.endSec,
                                turnAngle,
                                videoSpeed,
                                motionIntensity,
                                overrideSfxPresetId: note.selectedSfxPresetId || 'auto',
                                overrideTempoBpm: note.customTempoBpm,
                              });

                              const isNoteAudioPlaying =
                                playingAudioPreviewId === `note-audio-${note.id}`;

                              // Calculate real-time playhead position (%) within this note's soundwave timeline
                              const liveSoundwaveCursorPct = isNoteAudioPlaying
                                ? auditionPlayheadPct
                                : isPlayheadHere
                                ? Math.max(
                                    0,
                                    Math.min(
                                      100,
                                      Math.round(
                                        ((playheadTime - note.startSec) / clipDur) * 100
                                      )
                                    )
                                  )
                                : null;

                              // Find currently active bar at playhead or hover for real-time dBFS telemetry
                              const hoveredBarForThisNote =
                                hoveredAudioWaveBar?.noteId === note.id
                                  ? hoveredAudioWaveBar
                                  : null;
                              const activePlayheadBarIndex =
                                liveSoundwaveCursorPct !== null
                                  ? Math.min(
                                      noteAudioTempo.soundwaveBars.length - 1,
                                      Math.max(
                                        0,
                                        Math.round(
                                          (liveSoundwaveCursorPct / 100) *
                                            (noteAudioTempo.soundwaveBars.length - 1)
                                        )
                                      )
                                    )
                                  : null;
                              const activePlayheadBar =
                                activePlayheadBarIndex !== null
                                  ? noteAudioTempo.soundwaveBars[activePlayheadBarIndex]
                                  : null;

                              // Build SVG continuous acoustic envelope curve points for this note's soundwave
                              const soundwaveSvgPoints = noteAudioTempo.soundwaveBars
                                .map((b, bIdx) => {
                                  const x =
                                    (bIdx /
                                      Math.max(1, noteAudioTempo.soundwaveBars.length - 1)) *
                                    100;
                                  const y = 50 - b.amplitude * 44;
                                  return `${x.toFixed(2)},${y.toFixed(2)}`;
                                })
                                .join(' ');

                              const isDragSource = draggedSceneNoteIndex === idx;
                              const isDragTarget =
                                dragOverSceneNoteIndex === idx && draggedSceneNoteIndex !== idx;

                              return (
                                <div
                                  key={note.id}
                                  draggable
                                  onDragStart={(e) => {
                                    setDraggedSceneNoteIndex(idx);
                                    e.dataTransfer.effectAllowed = 'move';
                                    e.dataTransfer.setData('text/plain', String(idx));
                                  }}
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                    if (dragOverSceneNoteIndex !== idx) {
                                      setDragOverSceneNoteIndex(idx);
                                    }
                                  }}
                                  onDragLeave={() => {
                                    if (dragOverSceneNoteIndex === idx) {
                                      setDragOverSceneNoteIndex(null);
                                    }
                                  }}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    const fromIdx =
                                      draggedSceneNoteIndex !== null
                                        ? draggedSceneNoteIndex
                                        : parseInt(e.dataTransfer.getData('text/plain'), 10);
                                    setDraggedSceneNoteIndex(null);
                                    setDragOverSceneNoteIndex(null);
                                    if (!Number.isNaN(fromIdx) && fromIdx !== idx) {
                                      handleReorderSceneNote(fromIdx, idx);
                                    }
                                  }}
                                  onDragEnd={() => {
                                    setDraggedSceneNoteIndex(null);
                                    setDragOverSceneNoteIndex(null);
                                  }}
                                  style={{
                                    borderLeftWidth: '4px',
                                    borderLeftColor: catMeta.colorHex,
                                    borderColor: isDragTarget
                                      ? '#D4A359'
                                      : isEditingThisNote
                                      ? catMeta.colorHex
                                      : isTrimMatched
                                      ? catMeta.colorHex
                                      : `${catMeta.colorHex}45`,
                                  }}
                                  className={`border rounded p-3 transition-all bg-[#0B0A09] ${
                                    isDragTarget ? 'ring-2 ring-[#D4A359]/30' : ''
                                  } ${isDragSource ? 'opacity-60' : ''}`}
                                >
                                  <div className="flex flex-col lg:flex-row gap-3.5 items-stretch">
                                    {/* Left Vertical Storyboard Spine + Category Color Tag + Drag Handle + Order Controls */}
                                    <div className="flex lg:flex-col items-center justify-between lg:justify-start gap-2 lg:w-32 shrink-0 border-b lg:border-b-0 lg:border-r border-[#D4A359]/20 pb-2 lg:pb-0 lg:pr-3">
                                      <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing title='Sırayı değiştirmek için sürükleyin'">
                                        <GripVertical className="w-4 h-4 text-[#D4A359]" />
                                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                                          SAHNE 0{note.sceneOrder}
                                        </span>
                                      </div>

                                      {/* Distinct Color-Coded Category Badge (KAMERA / IŞIK / HAREKET / SES) */}
                                      <span
                                        style={{
                                          backgroundColor: catMeta.colorHex,
                                          color: '#FFFFFF',
                                        }}
                                        className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded inline-flex items-center gap-1 shadow-xs"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        <span>{catMeta.badgeLabelTr}</span>
                                      </span>

                                      <div className="text-[10.5px] font-mono font-bold text-[#F5F2EB] text-center">
                                        {note.startSec.toFixed(1)}sn – {note.endSec.toFixed(1)}sn
                                        <span className="block text-[9.5px] font-normal text-[#F5F2EB]/60">
                                          ({clipDur.toFixed(1)}sn · Kare {startFrame}–{endFrame})
                                        </span>
                                      </div>

                                      {/* Vertical Reorder Up / Down Buttons */}
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          disabled={idx <= 0}
                                          onClick={() => handleReorderSceneNote(idx, idx - 1)}
                                          title="Sahneyi Zaman Sırasında Yukarı (Önceye) Taşı"
                                          className={`px-1.5 py-1 text-[10px] font-mono rounded border inline-flex items-center gap-0.5 ${
                                            idx <= 0
                                              ? 'border-[#D4A359]/15 text-[#F5F2EB]/30 cursor-not-allowed'
                                              : 'border-[#D4A359]/35 text-[#D4A359] hover:border-[#D4A359] cursor-pointer'
                                          }`}
                                        >
                                          <ArrowUp className="w-3 h-3" />
                                          <span>Yukarı</span>
                                        </button>
                                        <button
                                          type="button"
                                          disabled={idx >= sortedSceneNotes.length - 1}
                                          onClick={() => handleReorderSceneNote(idx, idx + 1)}
                                          title="Sahneyi Zaman Sırasında Aşağı (Sonraya) Taşı"
                                          className={`px-1.5 py-1 text-[10px] font-mono rounded border inline-flex items-center gap-0.5 ${
                                            idx >= sortedSceneNotes.length - 1
                                              ? 'border-[#D4A359]/15 text-[#F5F2EB]/30 cursor-not-allowed'
                                              : 'border-[#D4A359]/35 text-[#D4A359] hover:border-[#D4A359] cursor-pointer'
                                          }`}
                                        >
                                          <ArrowDown className="w-3 h-3" />
                                          <span>Aşağı</span>
                                        </button>
                                      </div>
                                    </div>

                                    {/* 9:16 Mini Storyboard Visual Frame (Shown in Vertical Storyboard Mode) */}
                                    {storyboardViewMode === 'vertical-storyboard' && (
                                      <div
                                        onClick={() => handleSelectSceneNoteOnTimeline(note)}
                                        style={{ borderColor: `${catMeta.colorHex}88` }}
                                        className="relative w-full sm:w-28 h-40 rounded border overflow-hidden shrink-0 cursor-pointer group bg-[#0B0A09]"
                                      >
                                          <img
                                            src={
                                              generatedVerifyImageUrl ||
                                              customAnchorImageUrl ||
                                              currentPackage.previewImage
                                            }
                                            alt={note.titleTr}
                                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform"
                                          />
                                        <div className="absolute inset-x-0 top-0 p-1 bg-[#0B0A09]/85 flex items-center justify-between text-[8.5px] font-mono text-[#F5F2EB]">
                                          <span
                                            style={{ color: catMeta.textHex }}
                                            className="font-bold"
                                          >
                                            {catMeta.badgeLabelTr}
                                          </span>
                                          <span
                                            style={{ color: noteAudioTempo.colorHex }}
                                            className="font-bold"
                                          >
                                            %{noteAudioTempo.intensityPct}
                                          </span>
                                        </div>
                                        {/* Mini Colored Audio Soundwave Sparkline at Bottom of 9:16 Frame */}
                                        <div className="absolute inset-x-0 bottom-0 p-1 bg-[#0B0A09]/90 space-y-0.5">
                                          <div className="flex items-end justify-between gap-[1px] h-4">
                                            {noteAudioTempo.soundwaveBars
                                              .filter((_, bIdx) => bIdx % 3 === 0)
                                              .slice(0, 9)
                                              .map((sBar) => (
                                                <span
                                                  key={sBar.index}
                                                  style={{
                                                    height: `${Math.max(
                                                      24,
                                                      Math.round(sBar.amplitude * 100)
                                                    )}%`,
                                                    backgroundColor: sBar.barColorHex,
                                                  }}
                                                  className="flex-1 rounded-xs"
                                                />
                                              ))}
                                          </div>
                                          <div className="text-[8px] font-mono text-[#F5F2EB] truncate text-center">
                                            {noteAudioTempo.tempoBpm} BPM · {noteAudioTempo.peakDbFs} dB
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Main Storyboard Content + Category Switcher + Real-Time Visual 'Audio Soundwave' Timeline */}
                                    <div className="flex-1 space-y-2.5 min-w-0">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                          {/* Colored Category Tag Badge */}
                                          <span
                                            style={{
                                              backgroundColor: catMeta.bgTintHex,
                                              borderColor: catMeta.colorHex,
                                              color: catMeta.textHex,
                                            }}
                                            className="px-2 py-0.5 text-[10px] font-mono font-bold rounded border inline-flex items-center gap-1"
                                          >
                                            <span
                                              style={{ backgroundColor: catMeta.colorHex }}
                                              className="w-1.5 h-1.5 rounded-full"
                                            />
                                            <span>{catMeta.shortLabelTr}</span>
                                          </span>

                                          <span className="text-xs font-bold text-[#F5F2EB]">
                                            {note.titleTr}
                                          </span>
                                          <span className="text-[10px] font-mono text-[#D4A359]">
                                            · {note.cameraNoteTr}
                                          </span>
                                          <span
                                            style={{
                                              backgroundColor: noteAudioTempo.colorHex,
                                              color: '#FFFFFF',
                                            }}
                                            className="px-1.5 py-0.5 text-[9.5px] font-mono font-bold rounded"
                                          >
                                            Aksiyon %{noteAudioTempo.intensityPct}
                                          </span>
                                          {isEditingThisNote && (
                                            <span className="text-[10px] font-mono font-bold text-[#D4A359]">
                                              [DÜZENLENİYOR]
                                            </span>
                                          )}
                                          {isTrimMatched && !isEditingThisNote && (
                                            <span className="text-[10px] font-mono font-bold text-[#D4A359]">
                                              [AKTİF TRİM SEÇİMİ]
                                            </span>
                                          )}
                                          {isPlayheadHere && (
                                            <span className="text-[10px] font-mono text-[#34D399] font-bold">
                                              ● CANLI İMLEÇ ({playheadTime.toFixed(1)}sn)
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                                          {/* Quick Inline Category Re-Tagging Pills (Kamera, Işık, Hareket, Ses) */}
                                          <div className="inline-flex items-center gap-1 border border-[#D4A359]/25 rounded p-0.5 bg-[#0B0A09]">
                                            {SCENE_NOTE_CATEGORIES.map((cOpt) => {
                                              const isCurrentCat = catMeta.id === cOpt.id;
                                              return (
                                                <button
                                                  key={cOpt.id}
                                                  type="button"
                                                  onClick={() =>
                                                    handleChangeNoteCategory(note.id, cOpt.id)
                                                  }
                                                  title={`Kategoriyi "${cOpt.shortLabelTr}" olarak etiketle`}
                                                  style={{
                                                    backgroundColor: isCurrentCat
                                                      ? cOpt.colorHex
                                                      : 'transparent',
                                                    color: isCurrentCat
                                                      ? '#FFFFFF'
                                                      : cOpt.textHex,
                                                  }}
                                                  className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-xs cursor-pointer transition-colors"
                                                >
                                                  {cOpt.shortLabelTr}
                                                </button>
                                              );
                                            })}
                                          </div>

                                          <button
                                            type="button"
                                            onClick={() => handleSelectSceneNoteOnTimeline(note)}
                                            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded border cursor-pointer ${
                                              isTrimMatched
                                                ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359]'
                                                : 'border-[#D4A359]/35 text-[#D4A359] hover:border-[#D4A359]'
                                            }`}
                                          >
                                            {isTrimMatched ? 'Trim Kilitli' : 'Trim Aralığına Git'}
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() => handleStartEditSceneNote(note)}
                                            className={`px-2.5 py-1 text-[10px] font-mono rounded border inline-flex items-center gap-1 cursor-pointer ${
                                              isEditingThisNote
                                                ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                                                : 'text-[#D4A359] border-[#D4A359]/30 hover:border-[#D4A359]'
                                            }`}
                                          >
                                            <Edit3 className="w-3 h-3" />
                                            <span>
                                              {isEditingThisNote ? 'Düzenleniyor' : 'Düzenle'}
                                            </span>
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() => handleDeleteSceneNote(note.id)}
                                            className="px-2 py-1 text-[10px] font-mono text-[#F5F2EB]/55 hover:text-[#D4A359] border border-[#D4A359]/20 rounded cursor-pointer"
                                            title="Sahne Notunu Sil"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>

                                      <p className="text-xs text-[#F5F2EB]/85 leading-relaxed">
                                        {note.descriptionTr}
                                      </p>

                                      {/* REAL-TIME VISUAL 'AUDIO SOUNDWAVE' TIMELINE VISUALIZATION UNDERNEATH SCENE NOTE */}
                                      <div
                                        style={{
                                          borderColor: `${catMeta.colorHex}55`,
                                        }}
                                        className="border rounded p-2.5 bg-[#0B0A09] space-y-2"
                                      >
                                        {/* Top Row: Selected SFX & Tempo Details + Live Audition & Prompt Sync Buttons */}
                                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
                                          <div className="space-y-0.5 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                                              <span
                                                style={{
                                                  backgroundColor: catMeta.bgTintHex,
                                                  color: catMeta.textHex,
                                                  borderColor: `${catMeta.colorHex}66`,
                                                }}
                                                className="px-1.5 py-0.5 rounded border font-bold uppercase inline-flex items-center gap-1"
                                              >
                                                <Activity className="w-3 h-3" />
                                                <span>SES DALGASI ZAMAN ÇİZELGESİ</span>
                                              </span>
                                              <span
                                                style={{ color: noteAudioTempo.colorHex }}
                                                className="font-bold uppercase inline-flex items-center gap-1"
                                              >
                                                <Volume2 className="w-3 h-3" />
                                                SFX: {noteAudioTempo.sfxTitleTr}
                                              </span>
                                              <span className="text-[#F5F2EB]/40">·</span>
                                              <span className="text-[#D4A359] font-bold inline-flex items-center gap-1">
                                                <Music className="w-3 h-3" />
                                                Tempo: {noteAudioTempo.tempoLabelTr}
                                              </span>
                                            </div>
                                            <p className="text-[10.5px] text-[#F5F2EB]/70 leading-snug">
                                              {noteAudioTempo.sfxDetailTr} —{' '}
                                              <span className="font-mono text-[#D4A359]">
                                                {noteAudioTempo.rhythmCueTr}
                                              </span>
                                            </p>
                                          </div>

                                          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                                            {/* Tempo BPM Fine-Tune Controls (-5 / +5 BPM) */}
                                            <div className="inline-flex items-center gap-1 border border-[#D4A359]/30 rounded px-1.5 py-0.5 text-[9.5px] font-mono">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleAdjustNoteTempoBpm(
                                                    note.id,
                                                    noteAudioTempo.tempoBpm,
                                                    -5
                                                  )
                                                }
                                                title="Tempoyu 5 BPM Düşür"
                                                className="text-[#D4A359] hover:underline cursor-pointer px-1"
                                              >
                                                -5
                                              </button>
                                              <span className="text-[#F5F2EB] font-bold">
                                                {noteAudioTempo.tempoBpm} BPM
                                              </span>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleAdjustNoteTempoBpm(
                                                    note.id,
                                                    noteAudioTempo.tempoBpm,
                                                    5
                                                  )
                                                }
                                                title="Tempoyu 5 BPM Artır"
                                                className="text-[#D4A359] hover:underline cursor-pointer px-1"
                                              >
                                                +5
                                              </button>
                                            </div>

                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleAuditionSceneAudioTempo(
                                                  noteAudioTempo,
                                                  `note-audio-${note.id}`,
                                                  { startSec: note.startSec, endSec: note.endSec }
                                                )
                                              }
                                              style={{
                                                borderColor: isNoteAudioPlaying
                                                  ? catMeta.colorHex
                                                  : undefined,
                                                backgroundColor: isNoteAudioPlaying
                                                  ? catMeta.colorHex
                                                  : undefined,
                                                color: isNoteAudioPlaying ? '#FFFFFF' : undefined,
                                              }}
                                              className="px-2.5 py-1 text-[10px] font-mono font-semibold border border-[#D4A359]/35 rounded text-[#D4A359] hover:border-[#D4A359] inline-flex items-center gap-1 cursor-pointer"
                                            >
                                              <Volume2 className="w-3 h-3" />
                                              <span>
                                                {isNoteAudioPlaying
                                                  ? `Çalıyor (%${auditionPlayheadPct})`
                                                  : 'Sesi Dinle'}
                                              </span>
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleInjectAudioTempoToExistingNote(note)
                                              }
                                              className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 cursor-pointer"
                                            >
                                              + Ses/Tempo Nota İşle
                                            </button>
                                          </div>
                                        </div>

                                        {/* Interactive SFX Preset Selector Pills per Scene Note */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#D4A359]/15">
                                          <div className="flex flex-wrap items-center gap-1">
                                            <span className="text-[9.5px] font-mono text-[#F5F2EB]/60 mr-1">
                                              Ses Efekti Seç:
                                            </span>
                                            {SCENE_AUDIO_SFX_PRESETS.map((preset) => {
                                              const isActivePreset =
                                                (note.selectedSfxPresetId || 'auto') === preset.id;
                                              return (
                                                <button
                                                  key={preset.id}
                                                  type="button"
                                                  onClick={() =>
                                                    handleSelectNoteSfxPreset(note.id, preset.id)
                                                  }
                                                  style={{
                                                    backgroundColor: isActivePreset
                                                      ? catMeta.colorHex
                                                      : 'transparent',
                                                    borderColor: isActivePreset
                                                      ? catMeta.colorHex
                                                      : 'rgba(212, 163, 89, 0.28)',
                                                    color: isActivePreset
                                                      ? '#FFFFFF'
                                                      : '#F5F2EB',
                                                  }}
                                                  className="px-2 py-0.5 text-[9px] font-mono rounded border cursor-pointer transition-colors"
                                                >
                                                  {preset.shortLabelTr}
                                                </button>
                                              );
                                            })}
                                          </div>

                                          {/* Real-Time Acoustic Intensity Readout (Live Playhead or Hover Bar) */}
                                          <div className="flex flex-wrap items-center gap-2 text-[9.5px] font-mono text-[#F5F2EB]/80">
                                            {hoveredBarForThisNote ? (
                                              <span style={{ color: catMeta.textHex }}>
                                                ● İncelenen Kare: {hoveredBarForThisNote.timeSec.toFixed(2)}sn · Yoğunluk:{' '}
                                                <strong>%{hoveredBarForThisNote.amplitudePct}</strong> ({hoveredBarForThisNote.dbFs} dBFS) ·{' '}
                                                {hoveredBarForThisNote.phaseLabelTr}
                                              </span>
                                            ) : activePlayheadBar ? (
                                              <span className="text-[#34D399]">
                                                ● Canlı Ses Yoğunluğu ({activePlayheadBar.timeSec.toFixed(2)}sn):{' '}
                                                <strong>
                                                  %{Math.round(activePlayheadBar.amplitude * 100)}
                                                </strong>{' '}
                                                ({activePlayheadBar.dbFs} dBFS) · {activePlayheadBar.phaseLabelTr}
                                              </span>
                                            ) : (
                                              <span>
                                                Tepe Ses: <strong className="text-[#D4A359]">{noteAudioTempo.peakDbFs} dBFS</strong> · Ort:{' '}
                                                <strong className="text-[#D4A359]">{noteAudioTempo.avgLufs} LUFS</strong> · Ritim:{' '}
                                                <strong className="text-[#D4A359]">{noteAudioTempo.beatCountInClip} Beat Vuruşu</strong>
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Visual Stereo-Mirrored 'Audio Soundwave' Timeline Canvas + SVG Envelope + Beat Grid */}
                                        <div className="space-y-1">
                                          <div className="relative h-14 w-full rounded border border-[#D4A359]/25 bg-[#0B0A09] px-2 py-1.5 flex items-center justify-between gap-[2px] overflow-hidden">
                                            {/* Horizontal Center 0-Axis Line */}
                                            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D4A359]/20 pointer-events-none" />

                                            {/* Continuous SVG Acoustic Intensity Curve Overlay */}
                                            <svg
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
                                            >
                                              <polyline
                                                fill="none"
                                                stroke={catMeta.colorHex}
                                                strokeWidth="1.4"
                                                strokeOpacity="0.65"
                                                points={soundwaveSvgPoints}
                                              />
                                            </svg>

                                            {/* Real-Time Synchronized Playhead Cursor inside the Scene Note's Soundwave */}
                                            {liveSoundwaveCursorPct !== null && (
                                              <div
                                                style={{ left: `${liveSoundwaveCursorPct}%` }}
                                                className="absolute inset-y-0 w-0.5 bg-[#F5F2EB] z-20 pointer-events-none flex flex-col items-center justify-between"
                                              >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5F2EB]" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5F2EB]" />
                                              </div>
                                            )}

                                            {/* 28 Interactive Mirrored Soundwave Bars */}
                                            {noteAudioTempo.soundwaveBars.map((sBar) => {
                                              const topHalfPct = Math.max(
                                                14,
                                                Math.round(sBar.amplitude * 48)
                                              );
                                              const bottomHalfPct = Math.max(
                                                10,
                                                Math.round(topHalfPct * 0.72)
                                              );
                                              const isNearNotePlayhead =
                                                activePlayheadBarIndex === sBar.index;

                                              return (
                                                <button
                                                  key={sBar.index}
                                                  type="button"
                                                  onMouseEnter={() =>
                                                    setHoveredAudioWaveBar({
                                                      noteId: note.id,
                                                      barIndex: sBar.index,
                                                      timeSec: sBar.timeSec,
                                                      dbFs: sBar.dbFs,
                                                      amplitudePct: Math.round(
                                                        sBar.amplitude * 100
                                                      ),
                                                      phaseLabelTr: sBar.phaseLabelTr,
                                                    })
                                                  }
                                                  onMouseLeave={() => setHoveredAudioWaveBar(null)}
                                                  onClick={() => {
                                                    setPlayheadTime(sBar.timeSec);
                                                    setSelectedSceneNoteId(note.id);
                                                    if (videoRef.current) {
                                                      videoRef.current.currentTime = sBar.timeSec;
                                                    }
                                                  }}
                                                  title={`${sBar.timeSec.toFixed(2)}sn · Ses Yoğunluğu: %${Math.round(
                                                    sBar.amplitude * 100
                                                  )} (${sBar.dbFs} dBFS) · ${sBar.phaseLabelTr}`}
                                                  className="flex-1 h-full flex flex-col items-center justify-center gap-[1px] cursor-pointer group relative z-10"
                                                >
                                                  {/* BPM Beat Marker Dot at Top of Bar */}
                                                  {sBar.isBeatMarker && (
                                                    <span
                                                      style={{
                                                        backgroundColor: sBar.isTransientPeak
                                                          ? noteAudioTempo.colorHex
                                                          : catMeta.colorHex,
                                                      }}
                                                      className="absolute top-0 w-1.5 h-1.5 rounded-full"
                                                    />
                                                  )}

                                                  {/* Upper Stereo Soundwave Bar */}
                                                  <span
                                                    style={{
                                                      height: `${topHalfPct}%`,
                                                      backgroundColor: isNearNotePlayhead
                                                        ? '#F5F2EB'
                                                        : sBar.barColorHex,
                                                    }}
                                                    className="w-full rounded-t-xs transition-all group-hover:opacity-100 opacity-90"
                                                  />

                                                  {/* Lower Mirrored Stereo Reflection Bar */}
                                                  <span
                                                    style={{
                                                      height: `${bottomHalfPct}%`,
                                                      backgroundColor: isNearNotePlayhead
                                                        ? '#F5F2EB'
                                                        : sBar.barColorHex,
                                                      opacity: isNearNotePlayhead ? 0.85 : 0.42,
                                                    }}
                                                    className="w-full rounded-b-xs transition-all"
                                                  />
                                                </button>
                                              );
                                            })}
                                          </div>

                                          {/* Soundwave Timeline Timecode Ruler & Beat Legend */}
                                          <div className="flex items-center justify-between text-[9.5px] font-mono text-[#F5F2EB]/55 px-0.5">
                                            <span>Giriş: {note.startSec.toFixed(1)}sn</span>
                                            <span className="inline-flex items-center gap-2">
                                              <span className="inline-flex items-center gap-1">
                                                <span
                                                  style={{ backgroundColor: catMeta.colorHex }}
                                                  className="w-1.5 h-1.5 rounded-full inline-block"
                                                />
                                                {noteAudioTempo.tempoBpm} BPM Ritim Vuruşu (Her{' '}
                                                {noteAudioTempo.beatIntervalSec}sn)
                                              </span>
                                              <span>·</span>
                                              <span className="inline-flex items-center gap-1">
                                                <span
                                                  style={{
                                                    backgroundColor: noteAudioTempo.colorHex,
                                                  }}
                                                  className="w-1.5 h-1.5 rounded-full inline-block"
                                                />
                                                Foley / Akustik Tepe Noktası
                                              </span>
                                            </span>
                                            <span>Çıkış: {note.endSec.toFixed(1)}sn</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="text-[10px] font-mono text-[#F5F2EB]/65 border-t border-[#D4A359]/15 pt-1.5 flex items-center justify-between gap-2">
                                        <code className="truncate block">
                                          Prompt Direktifi: {note.promptDirectiveEn}
                                        </code>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCopyText(
                                              note.promptDirectiveEn,
                                              `copy-note-${note.id}`
                                            )
                                          }
                                          className="text-[#D4A359] hover:underline shrink-0 cursor-pointer"
                                        >
                                          {copiedTarget === `copy-note-${note.id}`
                                            ? 'Kopyalandı'
                                            : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

                    {/* CAMERA PATH OPTIMIZATION (TIMED ACTION SEQUENCE) PANEL */}
                    <div className="border-t border-[#D4A359]/20 pt-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#D4A359]" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                              Kamera Yolu Optimizasyonu (Zamanlamalı Aksiyon Akışı)
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F5F2EB]/65">
                            {activeCameraPathSpec.modeTitleTr} — Sahne geçişlerini ve kamera hareketlerini zaman kodlu olarak video promptuna işler.
                          </p>
                        </div>

                        <div
                          role="group"
                          aria-label="Kamera Yolu Optimizasyonu"
                          className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden shrink-0"
                        >
                          <button
                            type="button"
                            onClick={() => handleCameraPathToggle(true)}
                            className={`px-3 py-1.5 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                              cameraPathOptimized
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/70 hover:text-[#D4A359]'
                            }`}
                          >
                            Optimize: AÇIK
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCameraPathToggle(false)}
                            className={`px-3 py-1.5 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                              !cameraPathOptimized
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/70 hover:text-[#D4A359]'
                            }`}
                          >
                            KAPALI
                          </button>
                        </div>
                      </div>

                      {cameraPathOptimized && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                          {activeCameraPathSpec.phases.map((phase) => (
                            <div
                              key={phase.timeRange}
                              className="border border-[#D4A359]/25 rounded p-2.5 space-y-1 bg-[#0B0A09]"
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-[#D4A359] font-semibold">
                                  {phase.timeRange}
                                </span>
                                <span className="text-[#F5F2EB]/65">{phase.phaseTitleTr}</span>
                              </div>
                              <div className="text-[11px] text-[#D4A359]/90 font-medium">
                                {phase.cameraPathTr}
                              </div>
                              <p className="text-[11px] text-[#F5F2EB]/75 leading-snug">
                                {phase.actionTr}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* AI-BASED VISUAL QUALITY SCORE (0-100) & MISSING DETAIL WARNING SYSTEM */}
                    <div className="border-t border-[#D4A359]/25 pt-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#D4A359]" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                              AI Görsel Kalite Puanı (0–100) &amp; Eksik Detay Uyarı Sistemi
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F5F2EB]/65">
                            {activeQualityReport.summaryTr}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <div className="font-mono text-xl font-bold text-[#D4A359] leading-none">
                              {activeQualityReport.overallScore}
                              <span className="text-xs font-normal text-[#F5F2EB]/60">/100</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#F5F2EB]/70 block mt-0.5">
                              {activeQualityReport.overallScore >= 92
                                ? 'Stüdyo Kalitesi'
                                : 'İyileştirilebilir'}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={isAnalyzingQuality}
                            onClick={() => handleRunAiQualityAnalysis()}
                            className="px-3 py-2 text-[11px] font-semibold text-[#D4A359] border border-[#D4A359]/45 hover:border-[#D4A359] rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            {isAnalyzingQuality ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>AI Analiz Ediyor...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>AI Kalite Analizi</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Overall Quality Progress Bar */}
                      <div className="w-full h-1.5 bg-[#D4A359]/15 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D4A359] transition-all duration-300"
                          style={{ width: `${activeQualityReport.overallScore}%` }}
                        />
                      </div>

                      {qualityAnalysisError && (
                        <div className="text-[11px] text-[#D4A359] border border-[#D4A359]/40 rounded px-3 py-2">
                          {qualityAnalysisError}
                        </div>
                      )}

                      {/* 4 Sub-Metric Quality Breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] font-mono">
                        <div className="border border-[#D4A359]/20 rounded p-2">
                          <span className="text-[#F5F2EB]/55 block text-[10px]">
                            Cilt &amp; Doğal Doku
                          </span>
                          <strong className="text-[#D4A359]">
                            {activeQualityReport.skinNaturalnessScore}/100
                          </strong>
                        </div>
                        <div className="border border-[#D4A359]/20 rounded p-2">
                          <span className="text-[#F5F2EB]/55 block text-[10px]">
                            Telefon Flaşı &amp; Ev
                          </span>
                          <strong className="text-[#D4A359]">
                            {activeQualityReport.phoneFlashRealismScore}/100
                          </strong>
                        </div>
                        <div className="border border-[#D4A359]/20 rounded p-2">
                          <span className="text-[#F5F2EB]/55 block text-[10px]">
                            3 Satır Kağıt Netliği
                          </span>
                          <strong className="text-[#D4A359]">
                            {activeQualityReport.verificationCardScore}/100
                          </strong>
                        </div>
                        <div className="border border-[#D4A359]/20 rounded p-2">
                          <span className="text-[#F5F2EB]/55 block text-[10px]">
                            Kamera &amp; Aksiyon Akışı
                          </span>
                          <strong className="text-[#D4A359]">
                            {activeQualityReport.cameraPathMotionScore}/100
                          </strong>
                        </div>
                      </div>

                      {/* Missing Detail Warnings List */}
                      {activeQualityReport.missingDetails.length > 0 ? (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>
                              Eksik Detay Uyarıları ({activeQualityReport.missingDetails.length})
                            </span>
                          </div>
                          <div className="space-y-2">
                            {activeQualityReport.missingDetails.map((warn) => (
                              <div
                                key={warn.id}
                                className="border border-[#D4A359]/35 rounded p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#0B0A09]"
                              >
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                                      EKSİK DETAY
                                    </span>
                                    <span className="text-xs font-semibold text-[#F5F2EB]">
                                      {warn.titleTr}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#F5F2EB]/75">
                                    {warn.descriptionTr}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleQuickFixWarning(warn)}
                                  className="px-3 py-1.5 text-[11px] font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                                >
                                  {warn.actionLabelTr}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="border border-[#D4A359]/25 rounded px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="text-[#F5F2EB]/85">
                            ✓ Eksik detay tespit edilmedi: 9:16 dikey format, doğal cilt dokusu, 3 satırlı kağıt, Fujifilm 400 greni ve zamanlamalı kamera yolu tam uyumlu.
                          </span>
                          <span className="font-mono text-[#D4A359] shrink-0 ml-2">TAM UYUMLU</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* MODEL DIFFERENTIATION (RUNWAY · KLING · LUMA) & TECHNICAL JARGON OPTIMIZATION PANEL */}
                <div className="space-y-4 pt-4 border-t border-[#D4A359]/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                        Model Farklılaştırma &amp; Teknik Jargon Optimizasyonu (Runway · Kling · Luma)
                      </span>
                      <p className="text-[11px] text-[#F5F2EB]/65">
                        Her video modelinin kendi yerel teknik parametreleriyle (ör. Kling için{' '}
                        <code className="text-[#D4A359]">motion_intensity</code> &amp;{' '}
                        <code className="text-[#D4A359]">cfg_scale</code>, Runway için{' '}
                        <code className="text-[#D4A359]">camera_control</code> &amp;{' '}
                        <code className="text-[#D4A359]">motion_brush</code>, Luma için{' '}
                        <code className="text-[#D4A359]">keyframe_0_weight</code> &amp;{' '}
                        <code className="text-[#D4A359]">ray2_physics</code>) zenginleştirilmiş özel prompt.
                      </p>
                    </div>

                    {/* Model Selector Tabs: Runway / Kling / Luma */}
                    <div
                      role="group"
                      aria-label="Video Modeli Seçimi (Runway, Kling, Luma)"
                      className="inline-flex items-center border border-[#D4A359]/40 rounded overflow-hidden shrink-0"
                    >
                      {(
                        [
                          { id: 'runway', label: 'Runway Gen-3', sub: 'Camera Control' },
                          { id: 'kling', label: 'Kling AI 1.6', sub: 'motion_intensity' },
                          { id: 'luma', label: 'Luma Ray2', sub: 'Keyframe 0→1' },
                        ] as const
                      ).map((mdl) => {
                        const isActive = selectedVideoModel === mdl.id;
                        return (
                          <button
                            key={mdl.id}
                            type="button"
                            onClick={() => setSelectedVideoModel(mdl.id)}
                            className={`px-3 py-1.5 text-left transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold block leading-tight">
                              {mdl.label}
                            </span>
                            <span
                              className={`text-[9px] font-mono block leading-tight ${
                                isActive ? 'text-[#0B0A09]/80' : 'text-[#D4A359]/80'
                              }`}
                            >
                              {mdl.sub}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Motion Intensity (motion_intensity) Control Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border border-[#D4A359]/25 rounded p-3 bg-[#0B0A09]">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359] block">
                        Hareket Yoğunluğu (<code className=" lowercase">motion_intensity</code>:{' '}
                        {(motionIntensity / 10).toFixed(2)} · {motionIntensity}/10)
                      </span>
                      <span className="text-[11px] text-[#F5F2EB]/70 block">
                        Kling <code className="text-[#D4A359]">motion_intensity</code>, Runway{' '}
                        <code className="text-[#D4A359]">motion_brush</code> ve Luma{' '}
                        <code className="text-[#D4A359]">velocity_scale</code> katsayısını kalibre eder.
                      </span>
                    </div>

                    <div
                      role="group"
                      aria-label="Motion Intensity Seçimi"
                      className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden shrink-0"
                    >
                      {[
                        { val: 2, label: '0.20 (2/10 Ultra Sakin)' },
                        { val: 3, label: '0.30 (3/10 İdeal)' },
                        { val: 4, label: '0.40 (4/10 Dengeli)' },
                        { val: 5, label: '0.50 (5/10 Dinamik)' },
                      ].map((mOpt) => {
                        const isActive = motionIntensity === mOpt.val;
                        return (
                          <button
                            key={mOpt.val}
                            type="button"
                            onClick={() => handleMotionIntensityChange(mOpt.val)}
                            className={`px-2.5 py-1.5 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-[#D4A359] text-[#0B0A09]'
                                : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                            }`}
                          >
                            {mOpt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Model Technical Jargon Breakdown Card */}
                  <div className="border border-[#D4A359]/30 rounded p-3.5 space-y-3 bg-[#0B0A09]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                            {activeModelSpec.nameTr}
                          </span>
                          <span className="text-xs font-mono text-[#D4A359]">
                            {activeModelSpec.architectureTr}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#F5F2EB]/75 mt-1">
                          {activeModelSpec.descriptionTr}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setUseCompressedVideoPrompt((prev) => !prev)}
                          className={`px-2.5 py-1 text-[10px] font-mono rounded border cursor-pointer ${
                            useCompressedVideoPrompt
                              ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                              : 'border-[#D4A359]/35 text-[#F5F2EB]/75 hover:text-[#D4A359]'
                          }`}
                        >
                          {useCompressedVideoPrompt ? 'Mod: Kısa Prompt' : 'Mod: Tam Teknik Prompt'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowAllModelPrompts((prev) => !prev)}
                          className={`px-2.5 py-1 text-[10px] font-mono rounded border cursor-pointer ${
                            showAllModelPrompts
                              ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359] font-bold'
                              : 'border-[#D4A359]/35 text-[#F5F2EB]/75 hover:text-[#D4A359]'
                          }`}
                        >
                          {showAllModelPrompts ? 'Tek Model Görünümü' : '3 Modeli Yan Yana Gör'}
                        </button>
                      </div>
                    </div>

                    {/* 4 Technical Jargon Parameter Pills/Boxes for the Active Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {activeModelSpec.jargonTerms.map((jItem) => (
                        <div
                          key={jItem.term}
                          className="border border-[#D4A359]/20 rounded p-2 space-y-0.5 bg-[#0B0A09]"
                        >
                          <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                            <code className="text-[#D4A359] font-semibold">{jItem.term}</code>
                            <span className="text-[#F5F2EB] text-[10px] truncate">
                              {jItem.value}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#F5F2EB]/65 leading-snug">
                            {jItem.explanationTr}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ADVANCED PROMPT FILTERS (FOTOGERÇEKÇİ · CINEMATIC · SANATSAL) & KEYWORD WEIGHTING ABOVE PROMPT OUTPUT */}
                  <div className="border border-[#D4A359]/35 rounded p-3.5 space-y-3 bg-[#0B0A09]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                            İleri Düzey Prompt Filtreleri (Stil Tonu &amp; Anahtar Kelime Ağırlığı)
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                            {activeFilterSpec.badgeTr}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#F5F2EB]/70">
                          {activeFilterSpec.toneDescriptionTr}
                        </p>
                      </div>

                      {/* 3 Style Filter Buttons: Fotogerçekçi / Cinematic / Sanatsal */}
                      <div
                        role="group"
                        aria-label="İleri Düzey Prompt Filtresi (Fotogerçekçi, Cinematic, Sanatsal)"
                        className="inline-flex items-center border border-[#D4A359]/40 rounded overflow-hidden shrink-0"
                      >
                        {ADVANCED_PROMPT_FILTER_OPTIONS.map((fOpt) => {
                          const isSelected = advancedFilterId === fOpt.id;
                          return (
                            <button
                              key={fOpt.id}
                              type="button"
                              onClick={() => handleAdvancedFilterChange(fOpt.id)}
                              className={`px-3 py-1.5 text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              <span className="text-xs font-mono font-bold block leading-tight">
                                {fOpt.id === 'fotogercekci'
                                  ? 'Fotogerçekçi'
                                  : fOpt.id === 'cinematic'
                                  ? 'Cinematic'
                                  : 'Sanatsal'}
                              </span>
                              <span
                                className={`text-[9px] font-mono block leading-tight ${
                                  isSelected ? 'text-[#0B0A09]/80' : 'text-[#D4A359]/80'
                                }`}
                              >
                                {fOpt.id === 'fotogercekci'
                                  ? 'Raw Candid'
                                  : fOpt.id === 'cinematic'
                                  ? '35mm Film'
                                  : 'Analog Art'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Keyword Weight Multiplier Selector Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#D4A359]/20">
                      <span className="text-[11px] font-mono text-[#D4A359]">
                        Anahtar Kelime Ağırlık Gücü (Keyword Weighting):
                      </span>
                      <div
                        role="group"
                        aria-label="Anahtar Kelime Ağırlık Çarpanı"
                        className="inline-flex items-center border border-[#D4A359]/35 rounded overflow-hidden"
                      >
                        {KEYWORD_WEIGHT_BOOST_OPTIONS.map((bOpt) => {
                          const isSelected = keywordWeightBoost === bOpt.id;
                          return (
                            <button
                              key={bOpt.id}
                              type="button"
                              onClick={() => handleKeywordWeightBoostChange(bOpt.id)}
                              className={`px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D4A359] text-[#0B0A09]'
                                  : 'bg-[#0B0A09] text-[#F5F2EB]/75 hover:text-[#D4A359]'
                              }`}
                            >
                              {bOpt.labelTr} ({bOpt.multiplierText})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 4 Weighted Keyword Tokens Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {activeFilterSpec.weightedTokens.map((wt) => (
                        <div
                          key={wt.tokenEn}
                          className="border border-[#D4A359]/20 rounded p-2 space-y-0.5 bg-[#0B0A09]"
                        >
                          <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                            <span className="text-[#D4A359] font-semibold">{wt.labelTr}</span>
                            <span className="px-1.5 py-0.5 bg-[#D4A359]/15 text-[#D4A359] rounded font-bold">
                              :{wt.effectiveWeight.split(':')[1]?.replace(')', '')}
                            </span>
                          </div>
                          <code className="text-[10px] font-mono text-[#F5F2EB]/85 block break-all">
                            {wt.effectiveWeight}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Display: Either Single Selected Model or All 3 Models Side-by-Side */}
                  {!showAllModelPrompts ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A359]">
                          {activeModelSpec.nameTr} Promptu ({activeFilterSpec.badgeTr} · {selectedFps} FPS · {videoSpeed}x Hız ·{' '}
                          motion_intensity={(motionIntensity / 10).toFixed(2)})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(activeModelPromptText, 'copy-video')}
                          className="px-3 py-1 text-xs font-medium text-[#D4A359] border border-[#D4A359]/35 hover:border-[#D4A359] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedTarget === 'copy-video' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Kopyalandı</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{activeModelSpec.nameTr} Promptunu Kopyala</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="w-full max-h-44 overflow-y-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[#F5F2EB]/90 bg-[#0B0A09] border border-[#D4A359]/25 rounded p-3.5 select-all">
                        {activeModelPromptText}
                      </pre>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {(
                        [
                          {
                            id: 'runway' as const,
                            spec: allModelSpecs.runway,
                            promptText: useCompressedVideoPrompt
                              ? currentPackage.videoPrompt.compressedRunwayEn
                              : currentPackage.videoPrompt.runwayEn,
                          },
                          {
                            id: 'kling' as const,
                            spec: allModelSpecs.kling,
                            promptText: useCompressedVideoPrompt
                              ? currentPackage.videoPrompt.compressedKlingEn
                              : currentPackage.videoPrompt.klingEn,
                          },
                          {
                            id: 'luma' as const,
                            spec: allModelSpecs.luma,
                            promptText: useCompressedVideoPrompt
                              ? currentPackage.videoPrompt.compressedLumaEn
                              : currentPackage.videoPrompt.lumaEn,
                          },
                        ]
                      ).map((entry) => {
                        const copyKey = `copy-model-${entry.id}`;
                        return (
                          <div
                            key={entry.id}
                            className="border border-[#D4A359]/25 rounded p-3 space-y-2 bg-[#0B0A09]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-xs font-mono font-bold text-[#D4A359]">
                                  {entry.spec.nameTr}
                                </span>
                                <span className="text-[10px] font-mono text-[#F5F2EB]/60 ml-2">
                                  ({entry.spec.badgeTr})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopyText(entry.promptText, copyKey)}
                                className="px-2.5 py-1 text-[11px] font-medium text-[#D4A359] border border-[#D4A359]/35 hover:border-[#D4A359] rounded flex items-center gap-1 cursor-pointer"
                              >
                                {copiedTarget === copyKey ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Kopyalandı</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Kopyala</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="w-full max-h-32 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-[#F5F2EB]/90 bg-[#0B0A09] border border-[#D4A359]/15 rounded p-2.5 select-all">
                              {entry.promptText}
                            </pre>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* STEP 4: 6 GALLERY POSES */}
            <section
              id="step-05-gallery"
              className="bg-[#0B0A09] border border-[#D4A359]/25 p-6 space-y-8 scroll-mt-28"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4A359]/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <Images className="w-5 h-5 text-[#D4A359]" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359] block">
                      Adım 04 · Kağıtsız Ev &amp; Telefon Flaşı Serisi
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-[#F5F2EB]">
                      6 Adet Galeri Fotoğraf Paketi
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={isGeneratingAllGallery || generatingPoseNumbers.length > 0}
                    onClick={handleGenerateAllSixGalleryImages}
                    className="px-3.5 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isGeneratingAllGallery ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>6 Görsel Üretiliyor...</span>
                      </>
                    ) : (
                      <>
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>6 Pozun Tümünü Görsel Üret</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const allSix = currentPackage.galleryPrompts
                        .map((g) => `[Poz ${g.poseNumber}]:\n${g.promptEn}`)
                        .join('\n\n');
                      handleCopyText(allSix, 'copy-all-gallery');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedTarget === 'copy-all-gallery' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>6 Prompt Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Tüm 6 Promptu Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {galleryImageError && (
                <div className="text-xs text-[#D4A359] border border-[#D4A359]/40 rounded px-3.5 py-2.5">
                  {galleryImageError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentPackage.galleryPrompts.map((pose) => {
                  const copyKey = `pose-${pose.poseNumber}`;
                  const isCopied = copiedTarget === copyKey;
                  const isGeneratingThis = generatingPoseNumbers.includes(pose.poseNumber);
                  const generatedUrl = generatedGalleryImages[pose.poseNumber];

                  return (
                    <article
                      key={pose.poseNumber}
                      className="group border-t border-[#D4A359]/30 pt-4 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-lg font-semibold text-[#F5F2EB]">
                            {pose.poseTitleTr}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(pose.promptEn, copyKey)}
                            className={`px-3 py-1 text-xs font-semibold rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
                              isCopied
                                ? 'bg-[#D4A359] text-[#0B0A09] border-[#D4A359]'
                                : 'border-[#D4A359]/35 text-[#D4A359] group-hover:bg-[#D4A359] group-hover:text-[#0B0A09]'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>

                        {generatedUrl && (
                          <div className="relative w-full aspect-[9/16] max-h-[280px] rounded overflow-hidden bg-[#0B0A09] border border-[#D4A359]/40">
                            <img
                              src={generatedUrl}
                              alt={pose.poseTitleTr}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <a
                              href={generatedUrl}
                              download={`vespera-poz-${pose.poseNumber}.png`}
                              className="absolute bottom-2 right-2 px-2.5 py-1 text-[11px] font-semibold bg-[#0B0A09]/90 text-[#D4A359] border border-[#D4A359]/50 rounded flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              <span>İndir</span>
                            </a>
                          </div>
                        )}

                        <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                          {pose.descriptionTr}
                        </p>

                        <pre className="w-full max-h-28 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-[#F5F2EB]/85 bg-[#0B0A09] border border-[#D4A359]/20 rounded p-2.5 select-all">
                          {pose.promptEn}
                        </pre>
                      </div>

                      <button
                        type="button"
                        disabled={isGeneratingThis}
                        onClick={() =>
                          handleGenerateGalleryPoseImage(pose.poseNumber, pose.promptEn)
                        }
                        className="w-full py-2 px-3 text-xs font-medium text-[#D4A359] border border-[#D4A359]/35 hover:border-[#D4A359] rounded disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isGeneratingThis ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Görsel Üretiliyor...</span>
                          </>
                        ) : (
                          <>
                            <ImagePlus className="w-3.5 h-3.5" />
                            <span>Poz #{pose.poseNumber} Görselini Üret</span>
                          </>
                        )}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          /* SAVED PACKAGES SECTION — SINGLE DARK BACKGROUND + GOLD DIVIDERS */
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4A359]/20 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359] block">
                  Kayıtlı Konsept Kütüphanesi
                </span>
                <h1 className="font-display text-3xl font-semibold text-[#F5F2EB]">
                  Arşivlenen Paketler ({savedPackages.length})
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleExportSaved('json')}
                  className="px-3.5 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON İndir</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportSaved('csv')}
                  className="px-3.5 py-2 text-xs font-medium text-[#D4A359] border border-[#D4A359]/40 hover:border-[#D4A359] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV İndir</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {savedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border-t border-[#D4A359]/30 pt-4 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#F5F2EB]/60">
                      <span className="font-mono text-[#D4A359]">{pkg.code}</span>
                      <span>{pkg.createdAt}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#F5F2EB]">
                      {pkg.packageTitleTr}
                    </h3>
                    <p className="text-xs text-[#F5F2EB]/75 line-clamp-2">
                      {pkg.videoPrompt.scenarioTr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setAiOverridePackage(null);
                          setHairId(pkg.hairId);
                          setWardrobeId(pkg.wardrobeId);
                          setSettingId(pkg.settingId);
                          setTurnAngle(pkg.turnAngle);
                          setSelectedFps(pkg.fps || 24);
                          setVideoSpeed(pkg.videoSpeed || 1);
                          setActiveSection('studio');
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-[#D4A359] text-[#0B0A09] rounded hover:opacity-90 cursor-pointer"
                      >
                        Stüdyoda Aç
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(pkg.videoPrompt.runwayEn, `saved-${pkg.id}`)
                        }
                        className="px-3 py-1.5 text-xs font-medium text-[#D4A359] border border-[#D4A359]/35 rounded cursor-pointer"
                      >
                        {copiedTarget === `saved-${pkg.id}`
                          ? 'Kopyalandı'
                          : 'Video Promptu Kopyala'}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSavedPackages((prev) => prev.filter((item) => item.id !== pkg.id))
                      }
                      className="p-1.5 text-[#F5F2EB]/50 hover:text-[#D4A359] cursor-pointer"
                      title="Paketi Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL: SAHNE KURGU & SES DALGASI RAPORU (PDF & METİN DIŞA AKTARMA) */}
      {showEditingReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-[#D4A359]/40 bg-[#0B0A09] text-[#F5F2EB] shadow-2xl overflow-hidden">
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 border-b border-[#D4A359]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B0A09]/95 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4A359]/15 border border-[#D4A359]/30 text-[#D4A359] shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-[#F5F2EB]">
                      Sahne Kurgu &amp; Ses Dalgası Prodüksiyon Raporu
                    </h2>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#D4A359] text-[#0B0A09] rounded">
                      9:16 Dikey · 4K UHD
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F2EB]/65">
                    Zaman çizelgesi notları, kategori süreleri, SFX tempo ve gerçek zamanlı ses dalgası verilerini PDF veya yapılandırılmış metin olarak dışa aktarın.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Format Tabs */}
                <div className="inline-flex items-center border border-[#D4A359]/35 rounded-lg overflow-hidden p-0.5 bg-[#0B0A09] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setReportFormatTab('preview')}
                    className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                      reportFormatTab === 'preview'
                        ? 'bg-[#D4A359] text-[#0B0A09] font-bold'
                        : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                    }`}
                  >
                    👁️ Önizleme (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportFormatTab('markdown')}
                    className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                      reportFormatTab === 'markdown'
                        ? 'bg-[#D4A359] text-[#0B0A09] font-bold'
                        : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                    }`}
                  >
                    📄 Metin (.md / .txt)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportFormatTab('json')}
                    className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                      reportFormatTab === 'json'
                        ? 'bg-[#D4A359] text-[#0B0A09] font-bold'
                        : 'text-[#F5F2EB]/70 hover:text-[#D4A359]'
                    }`}
                  >
                    ⚡ JSON
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEditingReportModal(false)}
                  className="p-2 rounded-lg text-[#F5F2EB]/60 hover:text-[#F5F2EB] hover:bg-[#D4A359]/15 transition-colors cursor-pointer"
                  title="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-[#D4A359]/15 bg-[#0B0A09]/70 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shrink-0">
              <div className="flex items-center gap-2 text-[#F5F2EB]/75">
                <span>Toplam: <strong className="text-[#D4A359]">{sortedSceneNotes.length} Sahne Notu</strong></span>
                <span>·</span>
                <span>Süre: <strong className="text-[#D4A359]">{categoryNoteCounts.durations.all.toFixed(1)}sn</strong></span>
                <span>·</span>
                <span>Kare: <strong className="text-[#D4A359]">{selectedFps} FPS</strong></span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Primary Print / PDF Button */}
                <button
                  type="button"
                  onClick={handlePrintEditingReport}
                  className="px-3.5 py-1.5 bg-[#D4A359] text-[#0B0A09] font-bold rounded-lg hover:opacity-90 inline-flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  title="Tarayıcı yazdırma veya 'PDF Olarak Kaydet' iletişim kutusunu açar"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF Olarak Yazdır / Kaydet</span>
                </button>

                {/* Download Markdown */}
                <button
                  type="button"
                  onClick={() => handleDownloadEditingReportText('md')}
                  className="px-3 py-1.5 border border-[#D4A359]/40 text-[#D4A359] hover:bg-[#D4A359]/10 font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Yapılandırılmış Markdown (.md) dosyası olarak indir"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.MD İndir</span>
                </button>

                {/* Download Text */}
                <button
                  type="button"
                  onClick={() => handleDownloadEditingReportText('txt')}
                  className="px-3 py-1.5 border border-[#D4A359]/40 text-[#D4A359] hover:bg-[#D4A359]/10 font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Düz metin (.txt) dosyası olarak indir"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>.TXT İndir</span>
                </button>

                {/* Copy Report Text */}
                <button
                  type="button"
                  onClick={handleCopyReportText}
                  className="px-3 py-1.5 border border-[#D4A359]/40 text-[#D4A359] hover:bg-[#D4A359]/10 font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {reportCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Rapor Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Panoya Kopyala</span>
                    </>
                  )}
                </button>

                {/* Download JSON */}
                <button
                  type="button"
                  onClick={handleDownloadEditingReportJson}
                  className="px-2.5 py-1.5 border border-[#D4A359]/25 text-[#F5F2EB]/70 hover:text-[#D4A359] hover:border-[#D4A359] rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
                  title="NLE Kurgu boru hatları için JSON veri dosyasını indir"
                >
                  <span>JSON İndir</span>
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {reportFormatTab === 'preview' ? (
                <div
                  id="editing-report-printable-area"
                  className="space-y-6 bg-[#0B0A09] rounded-xl p-4 sm:p-6 border border-[#D4A359]/20"
                >
                  {/* Report Header Card */}
                  <div className="border-b border-[#D4A359]/25 pb-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A359]">
                        PRODÜKSİYON &amp; KURGU DİREKTİF RAPORU
                      </span>
                      <span className="text-[11px] font-mono text-[#F5F2EB]/60">
                        {new Date().toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#F5F2EB]">
                      9:16 Dikey Sosyal Medya Sinematik Sahne Kurgu ve Akustik Analiz Raporu
                    </h1>
                    <p className="text-xs text-[#F5F2EB]/75 max-w-3xl leading-relaxed">
                      TikTok, Instagram Reels ve YouTube Shorts için Fujifilm Superia 400 film dokusu, doğal ten kusurları ve 3 satırlı fiziksel doğrulama kağıdı içeren 4K UHD kurgu planı.
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/60 space-y-1">
                      <span className="text-[10px] uppercase text-[#F5F2EB]/55 block">Model &amp; Karakter</span>
                      <strong className="text-[#D4A359] block truncate">
                        {customAnchorFileName
                          ? `Özel: ${customAnchorFileName}`
                          : (ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId) || ANCHOR_IMAGE_PRESETS[1]).nameTr}
                      </strong>
                      <span className="text-[10.5px] text-[#F5F2EB]/75 block truncate">
                        {(ANCHOR_IMAGE_PRESETS.find((a) => a.id === anchorId) || ANCHOR_IMAGE_PRESETS[1]).tagEn}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/60 space-y-1">
                      <span className="text-[10px] uppercase text-[#F5F2EB]/55 block">Mekan &amp; Atmosfer</span>
                      <strong className="text-[#D4A359] block truncate">
                        {(SETTING_OPTIONS.find((s) => s.id === settingId) || SETTING_OPTIONS[0]).labelTr}
                      </strong>
                      <span className="text-[10.5px] text-[#F5F2EB]/75 block truncate">
                        {(SETTING_OPTIONS.find((s) => s.id === settingId) || SETTING_OPTIONS[0]).detailTr}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/60 space-y-1">
                      <span className="text-[10px] uppercase text-[#F5F2EB]/55 block">Video Teknik Parametreleri</span>
                      <strong className="text-[#D4A359] block">{categoryNoteCounts.durations.all.toFixed(1)}sn · {selectedFps} FPS</strong>
                      <span className="text-[10.5px] text-[#F5F2EB]/75 block">{videoSpeed}x Hız · ~{Math.round(categoryNoteCounts.durations.all * selectedFps)} Kare</span>
                    </div>
                    <div className="p-3 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/60 space-y-1">
                      <span className="text-[10px] uppercase text-[#F5F2EB]/55 block">Fiziksel Doğrulama Kartı</span>
                      <strong className="text-[#D4A359] block truncate">1. {verificationHeader}</strong>
                      <span className="text-[10.5px] text-[#F5F2EB]/75 block truncate">2. {verificationDate} · 3. {verificationWebsite}</span>
                    </div>
                  </div>

                  {/* Category Breakdown Bar & Cards */}
                  <div className="space-y-3 p-4 rounded-xl border border-[#D4A359]/25 bg-[#0B0A09]/40">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#D4A359] uppercase tracking-wider">
                        Kategori Dağılım Çizelgesi (Kamera · Işık · Hareket · Ses)
                      </span>
                      <span className="text-[#F5F2EB]/65">
                        {sortedSceneNotes.length} Sahne Notu · Toplam {categoryNoteCounts.durations.all.toFixed(1)}sn
                      </span>
                    </div>

                    {/* Proportional Segmented Bar */}
                    <div className="h-2.5 w-full bg-[#0B0A09] rounded-full overflow-hidden flex border border-[#D4A359]/30">
                      {SCENE_NOTE_CATEGORIES.map((cMeta) => {
                        const totalAll = Math.max(0.1, categoryNoteCounts.durations.all);
                        const catDur = categoryNoteCounts.durations[cMeta.id] || 0;
                        const pct = Math.max(0, Math.min(100, (catDur / totalAll) * 100));
                        if (pct <= 0) return null;
                        return (
                          <div
                            key={cMeta.id}
                            style={{ width: `${pct}%`, backgroundColor: cMeta.colorHex }}
                            className="h-full"
                            title={`${cMeta.shortLabelTr}: ${catDur.toFixed(1)}sn (%${pct.toFixed(0)})`}
                          />
                        );
                      })}
                    </div>

                    {/* 4 Category Summary Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                      {SCENE_NOTE_CATEGORIES.map((cMeta) => {
                        const count = categoryNoteCounts.counts[cMeta.id] || 0;
                        const totalSec = categoryNoteCounts.durations[cMeta.id] || 0;
                        const totalAll = Math.max(0.1, categoryNoteCounts.durations.all);
                        const sharePct = ((totalSec / totalAll) * 100).toFixed(0);
                        return (
                          <div
                            key={cMeta.id}
                            style={{ borderColor: `${cMeta.colorHex}55` }}
                            className="p-2.5 rounded-lg border bg-[#0B0A09]/80 space-y-1 text-xs font-mono"
                          >
                            <div className="flex items-center justify-between">
                              <span style={{ color: cMeta.textHex }} className="font-bold uppercase">
                                {cMeta.shortLabelTr}
                              </span>
                              <span
                                style={{ backgroundColor: `${cMeta.colorHex}25`, color: cMeta.textHex }}
                                className="px-1.5 py-0.5 text-[9.5px] rounded font-bold"
                              >
                                {count} Not
                              </span>
                            </div>
                            <div className="flex items-baseline justify-between pt-0.5">
                              <span className="text-[#F5F2EB]/65 text-[11px]">Süre:</span>
                              <strong style={{ color: cMeta.textHex }} className="text-sm">
                                {totalSec.toFixed(1)}sn (%{sharePct})
                              </strong>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Scene Notes & Soundwaves */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#D4A359] border-b border-[#D4A359]/25 pb-1.5">
                      Sahne Notları, Zaman Çizelgesi ve Ses Dalgası Detayları
                    </h3>

                    <div className="space-y-3">
                      {sortedSceneNotes.map((note, index) => {
                        const catMeta = getSceneNoteCategoryMeta(note.category);
                        const rec = deriveSceneAudioTempoRecommendation({
                          descriptionTr: note.descriptionTr,
                          cameraNoteTr: note.cameraNoteTr,
                          titleTr: note.titleTr,
                          category: note.category,
                          startSec: note.startSec,
                          endSec: note.endSec,
                          turnAngle,
                          videoSpeed,
                          motionIntensity,
                          overrideSfxPresetId: note.selectedSfxPresetId || 'auto',
                          overrideTempoBpm: note.customTempoBpm,
                        });
                        const clipDur = Math.max(0.1, note.endSec - note.startSec);
                        const startFrame = Math.round(note.startSec * selectedFps);
                        const endFrame = Math.round(note.endSec * selectedFps);

                        return (
                          <div
                            key={note.id}
                            style={{ borderColor: `${catMeta.colorHex}66` }}
                            className="rounded-xl border p-4 bg-[#0B0A09]/70 space-y-3 shadow-sm hover:border-opacity-100 transition-colors"
                          >
                            {/* Note Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4A359]/15 pb-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#D4A359] text-[#0B0A09] text-xs font-black flex items-center justify-center shrink-0">
                                  {index + 1}
                                </span>
                                <span
                                  style={{
                                    backgroundColor: `${catMeta.colorHex}25`,
                                    color: catMeta.textHex,
                                    borderColor: `${catMeta.colorHex}66`,
                                  }}
                                  className="px-2 py-0.5 text-[10px] font-mono font-bold rounded border uppercase tracking-wider"
                                >
                                  {catMeta.badgeLabelTr}
                                </span>
                                <h4 className="text-sm font-bold text-[#F5F2EB]">
                                  {note.titleTr}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F2EB]/70">
                                <span className="px-2 py-0.5 rounded bg-[#0B0A09] border border-[#D4A359]/30 text-[#D4A359] font-bold">
                                  {note.startSec.toFixed(1)}s – {note.endSec.toFixed(1)}s ({clipDur.toFixed(1)}sn)
                                </span>
                                <span className="text-[11px] text-[#F5F2EB]/50">
                                  Kare: {startFrame}–{endFrame}
                                </span>
                              </div>
                            </div>

                            {/* Directive & Descriptions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div className="space-y-1 p-2.5 rounded-lg bg-[#0B0A09]/60 border border-[#D4A359]/15">
                                <span className="text-[10px] font-mono text-[#D4A359] uppercase font-bold block">
                                  Kamera &amp; Yönetmen Notu (TR)
                                </span>
                                <p className="text-[#F5F2EB]/85 leading-relaxed font-mono text-[11px]">
                                  {note.cameraNoteTr}
                                </p>
                                <p className="text-[#F5F2EB]/70 text-[11px] pt-1">
                                  {note.descriptionTr}
                                </p>
                              </div>

                              <div className="space-y-1 p-2.5 rounded-lg bg-[#0B0A09]/60 border border-[#D4A359]/15">
                                <span className="text-[10px] font-mono text-[#D4A359] uppercase font-bold block">
                                  9:16 Prompt Direktifi (EN)
                                </span>
                                <p className="text-[#F5F2EB]/85 font-mono text-[11px] leading-relaxed break-words">
                                  {note.promptDirectiveEn}
                                </p>
                              </div>
                            </div>

                            {/* Real-Time Audio Soundwave Timeline Bar & Acoustic Telemetry */}
                            <div className="p-3 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/90 space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono">
                                <div className="flex items-center gap-2">
                                  <Volume2 className="w-3.5 h-3.5 text-[#D4A359]" />
                                  <span className="text-[#F5F2EB] font-bold">
                                    {rec.sfxTitleTr}
                                  </span>
                                  <span className="text-[#F5F2EB]/60">
                                    ({rec.sfxDetailTr})
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-[10px]">
                                  <span className="px-1.5 py-0.5 rounded bg-[#D4A359]/20 text-[#D4A359] font-bold border border-[#D4A359]/30">
                                    {rec.tempoBpm} BPM ({rec.tempoLabelTr})
                                  </span>
                                  <span
                                    style={{
                                      backgroundColor: `${catMeta.colorHex}22`,
                                      color: catMeta.textHex,
                                      borderColor: `${catMeta.colorHex}44`,
                                    }}
                                    className="px-1.5 py-0.5 rounded font-bold border"
                                  >
                                    %{rec.intensityPct} Yoğunluk ({rec.levelLabelTr})
                                  </span>
                                  <span className="text-[#F5F2EB]/60">
                                    Tepe: {rec.peakDbFs} dBFS
                                  </span>
                                </div>
                              </div>

                              {/* Visual 28-Bar Waveform Timeline */}
                              <div className="relative h-11 w-full rounded border border-[#D4A359]/25 bg-[#0B0A09] px-2 py-1 flex items-center justify-between gap-[2px] overflow-hidden">
                                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D4A359]/20 pointer-events-none" />
                                {rec.soundwaveBars.map((bar) => {
                                  const barHeight = Math.max(10, Math.round(bar.amplitude * 100));
                                  return (
                                    <div
                                      key={bar.index}
                                      style={{
                                        height: `${barHeight}%`,
                                        backgroundColor: bar.barColorHex || catMeta.colorHex,
                                        opacity: bar.isTransientPeak ? 1 : 0.8,
                                      }}
                                      className="flex-1 rounded-sm transition-all"
                                      title={`Bar ${bar.index + 1} | ${bar.timeSec.toFixed(2)}s | Genlik: %${Math.round(bar.amplitude * 100)} | ${bar.dbFs} dBFS`}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Negative Prompt Directive */}
                  <div className="p-3.5 rounded-lg border border-[#D4A359]/25 bg-[#0B0A09]/60 space-y-1 text-xs">
                    <span className="font-mono text-[10.5px] font-bold text-[#D4A359] uppercase block">
                      Negatif Parametreler (Anti-Artifacts &amp; Film Dokusu Koruma)
                    </span>
                    <p className="font-mono text-[10.5px] text-[#F5F2EB]/70 leading-relaxed break-words">
                      {DEFAULT_NEGATIVE_PROMPT}
                    </p>
                  </div>
                </div>
              ) : reportFormatTab === 'markdown' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#F5F2EB]/70">
                    <span>Yapılandırılmış Markdown / Düz Metin Biçimi (.md / .txt)</span>
                    <span>{generateEditingReportMarkdown().length} karakter</span>
                  </div>
                  <pre className="p-4 rounded-xl border border-[#D4A359]/30 bg-[#0B0A09] text-[#F5F2EB] font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                    {generateEditingReportMarkdown()}
                  </pre>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#F5F2EB]/70">
                    <span>JSON Veri Formatı (Kurgu Yazılımları / NLE Pipelines)</span>
                    <span>application/json</span>
                  </div>
                  <pre className="p-4 rounded-xl border border-[#D4A359]/30 bg-[#0B0A09] text-[#F5F2EB] font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                    {JSON.stringify(
                      {
                        projectName: '9:16 Dikey Sinematik Sahne Kurgu ve Ses Dalgası Raporu',
                        generatedAt: new Date().toISOString(),
                        aspectRatio: '9:16',
                        resolution: '4K UHD (2160x3840)',
                        fps: selectedFps,
                        videoSpeed,
                        totalDurationSec: categoryNoteCounts.durations.all,
                        categoryDurations: categoryNoteCounts.durations,
                        categoryCounts: categoryNoteCounts.counts,
                        scenes: sortedSceneNotes.map((n, idx) => ({
                          sceneIndex: idx + 1,
                          id: n.id,
                          titleTr: n.titleTr,
                          category: n.category,
                          timecode: `${n.startSec.toFixed(1)}s - ${n.endSec.toFixed(1)}s`,
                          cameraDirectiveTr: n.cameraNoteTr,
                          descriptionTr: n.descriptionTr,
                          promptDirectiveEn: n.promptDirectiveEn,
                        })),
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 border-t border-[#D4A359]/20 bg-[#0B0A09] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="text-xs font-mono text-[#F5F2EB]/65">
                ✓ Bu rapor profesyonel video kurgusu, tempo senkronizasyonu ve 4K prompt yönetimi için optimize edilmiştir.
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setShowEditingReportModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D4A359]/35 text-[#F5F2EB]/80 hover:text-[#D4A359] hover:border-[#D4A359] transition-colors cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  type="button"
                  onClick={handlePrintEditingReport}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#D4A359] text-[#0B0A09] hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF Olarak Yazdır / Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
