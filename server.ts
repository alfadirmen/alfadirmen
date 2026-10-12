import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '30mb' }));

function getAiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function cleanPromptForMediaGeneration(rawPrompt: string): string {
  const parts = rawPrompt.split(/\s+--no\s+/i);
  let mainBody = (parts[0] || '')
    .replace(/--ar\s+\S+/gi, '')
    .replace(/--style\s+\S+/gi, '')
    .replace(/--v\s+\S+/gi, '')
    .replace(/--cref\s+\S+/gi, '')
    .replace(/--cw\s+\S+/gi, '')
    .trim();

  if (!mainBody.toLowerCase().includes('smartphone camera')) {
    mainBody +=
      '. Shot on a smartphone camera, slightly soft motion-blur and low-light indoor atmosphere, harsh direct camera flash burst, unfiltered raw candid photo, non-porcelain unretouched skin with slight natural skin imperfections and natural skin texture, everyday casual home environment';
  }

  const mandatoryNeg =
    'uncanny valley, plastic skin, porcelain doll skin, distorted jawline, over-tanned, exaggerated features, shifting face, deformed face, plastic airbrushed skin, bad anatomy, asymmetric eyes, extra fingers, mutated hands';
  const negativePart = parts[1]?.trim();
  const combinedNegative = negativePart
    ? `${negativePart}, ${mandatoryNeg}`
    : mandatoryNeg;

  return `${mainBody}. Strictly avoid: ${combinedNegative}.`;
}

function parseDataUrl(dataUrl?: string): { mimeType: string; data: string } | null {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return {
    mimeType: match[1],
    data: match[2],
  };
}

app.post('/api/generate-package', async (req, res) => {
  try {
    const ai = getAiClient();
    const {
      verificationHeader = 'VERIFIED',
      verificationDate = '04.10.2026',
      verificationWebsite = '',
      verificationCardStyle = 'Classic White Paper (crisp matte white A4 sheet with 3-line handwritten text)',
      hairInput = '',
      outfitInput = '',
      settingInput = '',
      turnAngle = 'soft',
      fps = 24,
      videoSpeed = 1,
      lightingMode = 'dogal',
      advancedFilterId = 'fotogercekci',
      keywordWeightBoost = 'guclu',
      autoLightingPromptEn = '',
      advancedFilterDirectiveEn = '',
      cameraPathOptimized = true,
      motionIntensity = 3,
      cameraSpeed = 'Locked-Off Static (0x)',
      lightingMood = 'Crisp Studio Indoor (4200K)',
      globalNegativePrompt = '',
      anchorCharacterEn = '',
      anchorCharacterTr = '',
      customNotes = '',
    } = req.body || {};

    const resolvedFps = Number(fps) === 60 ? 60 : Number(fps) === 30 ? 30 : 24;
    const resolvedVideoSpeed = Number(videoSpeed) === 0.5 ? 0.5 : Number(videoSpeed) === 2 ? 2 : 1;
    const speedDirectiveEn =
      resolvedVideoSpeed === 0.5
        ? '0.5x slow-motion temporal pacing, silky decelerated micro-movements, graceful half-speed hair and fabric sway, high-shutter temporal interpolation without motion blur or facial warping'
        : resolvedVideoSpeed === 2
        ? '2x fast-paced accelerated motion cadence, brisk energetic double-speed movement flow, crisp temporal transitions while keeping facial anatomy and 3-line verification card 100% locked and legible'
        : '1x natural real-time motion cadence, authentic human movement speed, organic real-time breathing and natural eye-blink pacing without artificial time-warping';

    const cleanWebText = verificationWebsite.trim();
    const threeLineDisplay = cleanWebText
      ? `${verificationHeader} / ${verificationDate} / ${cleanWebText}`
      : `${verificationHeader} / ${verificationDate} / `;

    const timedCameraPathDirectiveEn = cameraPathOptimized
      ? turnAngle === '360'
        ? `[Camera Path Optimization & Timed Action Sequence (${resolvedFps}fps)]: [0.0s–1.5s Frontal Anchor & Card Lock]: Locked eye-level smartphone flash framing holding the 3-line card at chest height + gentle "shh" gesture; [1.5s–3.8s Counter-Stabilized 360° Pivot Arc]: Smooth 360-degree full turn in stiletto heels with 0.15x counter-stabilized gimbal arc push-in preventing perspective warp or facial morphing; [3.8s–5.0s Frontal Re-Lock & Natural Smile]: Zero-shake frontal lock holding the 3-line card steady with a warm natural smile.`
        : turnAngle === '180'
        ? `[Camera Path Optimization & Timed Action Sequence (${resolvedFps}fps)]: [0.0s–1.5s Frontal Verification Lock]: Eye-level smartphone flash framing holding the 3-line card + "shh" gesture; [1.5s–3.5s Lateral Micro-Track & 180° Pivot]: Smooth 0.15x lateral tracking glide during 180-degree pivot in stiletto heels; [3.5s–5.0s Over-the-Shoulder Focus Lock]: Razor-sharp focus lock on eyes and jawline looking back over her shoulder.`
        : `[Camera Path Optimization & Timed Action Sequence (${resolvedFps}fps)]: [0.0s–1.8s Locked Frontal Anchor & Card Legibility]: Zero-shake static smartphone flash framing holding the 3-line card steady; [1.8s–3.6s Subtle Optical Push-In & Micro Head Tilt]: Imperceptible 0.1x optical push-in with warm natural smile and gentle 5-degree head tilt; [3.6s–5.0s Steady Verification Hold]: Undistorted facial symmetry and crisp 3-line paper hold.`
      : '';

    const motionChoreographyEn =
      turnAngle === 'soft' || Number(motionIntensity) <= 3
        ? `Calm, simplified single-flow micro-movement (Motion Intensity 3/10): she holds the verification card steadily at chest level, looks directly into the lens with a soft warm natural smile and a gentle subtle head tilt, avoiding complex rapid spins so her facial features and jawline remain 100% locked and undistorted. ${timedCameraPathDirectiveEn} [Motion Speed Directive (${resolvedVideoSpeed}x)]: ${speedDirectiveEn}.`
        : `${turnAngle}-degree smooth unhurried turn in high heels + gentle finger-to-lips 'shh' gesture while preserving facial symmetry. ${timedCameraPathDirectiveEn} [Motion Speed Directive (${resolvedVideoSpeed}x)]: ${speedDirectiveEn}.`;

    const normalizedMotion = (Number(motionIntensity || 3) / 10).toFixed(2);
    const systemInstruction = `You are a world-class AI Prompt Engineer specializing in vertical (9:16) 4K raw candid content packages with authentic Fujifilm 400 film grain for social media reels and gallery showcases.
Every single prompt (both English and Turkish descriptions) MUST strictly incorporate these two core realism rules:
- Telefon Çekimi Detayları (Phone Camera Details): "Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf." / English: "shot on a smartphone camera, slightly blurry and low-light indoor atmosphere, harsh direct camera flash burst, unfiltered, raw candid photo"
- Doğal Dokular (Natural Textures): "Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamı." / English: "non-porcelain unretouched skin with slight skin imperfections and natural human skin texture with visible pores, everyday casual home environment"

Generate a 100% consistent 3-part content package in BOTH English and Turkish:
1. Video Production Prompts with Model Differentiation (Runway Gen-3 Alpha / Kling AI 1.6 Pro / Luma Dream Machine Ray2):
   - runwayEn: Must use Runway Gen-3 Alpha bracketed camera-first syntax ([Camera & Phone Flash Look], [Subject & Natural Textures], [Environment], [Action & Verification Card]) and explicit Runway technical jargon: camera_control={pan, tilt, zoom, roll}, motion_brush={subject_body_scale: ${normalizedMotion}, facial_identity_lock: 0.96}, temporal_coherence_weight=0.95.
   - klingEn: Must use Kling AI 1.6 Pro technical jargon: motion_intensity=${normalizedMotion} (Motion Intensity ${motionIntensity}/10 — low-deformation anatomical preservation mode), cfg_scale=0.65, camera_control={mode: "gimbal_lock"}, kling_3d_skeleton_constraint="strict 5-finger hand anatomy & pinned 3-line verification card legibility", and 0.0s–5.0s continuous timeline choreography.
   - lumaEn: Must use Luma Dream Machine Ray2 keyframe bridge syntax ([Keyframe 0 — Start Frame Anchor (keyframe_0_weight=0.98)] -> [Luma Ray2 Physics & Optical Flow Interpolation (ray2_motion_physics={velocity_scale: ${normalizedMotion}}, ray2_light_transport)] -> [Keyframe 1 — End Frame Target (keyframe_1_weight=0.95)]).
   All three video prompts must be Vertical 9:16, ${resolvedFps}fps frame rate, ${resolvedVideoSpeed}x motion speed (${speedDirectiveEn}), raw smartphone camera flash aesthetic, Fujifilm 400 film grain, non-porcelain skin with slight imperfections in an everyday casual home environment, environment-matched auto-lighting (${autoLightingPromptEn || lightingMood}), and incorporate the Advanced Style Filter & Keyword Weights (${advancedFilterDirectiveEn || advancedFilterId}), holding ${verificationCardStyle} at chest height clearly displaying 3 handwritten lines (Line 1: "${verificationHeader}", Line 2: "${verificationDate}", Line 3: "${cleanWebText}").
2. Matching Verification Photo Prompt: Exact same character facial identity, hair, outfit, and everyday home setting, shot on a smartphone camera, slightly blurry and low-light, direct flash burst, unfiltered raw candid photo, non-porcelain skin with slight skin imperfections and natural skin texture while holding the exact same 3-line handwritten paper at chest level.
3. Gallery Photo Package Prompts (6 Distinct Poses WITHOUT the verification card): Exact same character, hair, outfit, and everyday home environment in 6 candid raw smartphone flash photos without any card.
Always append the negative prompt at the end: --no deformed face, ugly, distorted facial features, plastic airbrushed skin, bad anatomy, asymmetric eyes, blurry, extra fingers, mutated hands, cartoon, 3D render, anime, oversaturated neon lighting, watermark, UI overlay, uncanny valley, plastic skin, porcelain doll skin, distorted jawline, over-tanned, exaggerated features, shifting face.`;

    const userPrompt = `Generate a complete 3-part bilingual (English & Turkish) content package with these exact specifications:
- Target Video Frame Rate (Mandatory in Video Prompts): ${resolvedFps}fps (${resolvedFps} FPS)
- Target Video Motion Speed (Mandatory in Video Prompts): ${resolvedVideoSpeed}x (${speedDirectiveEn})
- Camera Path Optimization & Timed Action Sequence: ${timedCameraPathDirectiveEn || 'Standard static camera'}
- Environment-Matched Lighting Mode (${lightingMode}): ${autoLightingPromptEn || lightingMood}
- Advanced Prompt Filter & Keyword Weighting (${advancedFilterId} · ${keywordWeightBoost}): ${advancedFilterDirectiveEn || 'Photorealistic Raw Candid with weighted keywords'}
- Phone Camera Look (Mandatory): Telefon kamerasından çekilmiş, biraz bulanık ve düşük ışıklı, flaş patlamış, filtresiz, ham fotoğraf (shot on a smartphone camera, slightly blurry and low-light, direct flash burst, unfiltered raw candid photo)
- Natural Skin & Home Texture (Mandatory): Porselen gibi pürüzsüz olmayan, hafif cilt kusurları ve doğal ten dokusuna sahip, günlük ev ortamı (non-porcelain unretouched skin with slight skin imperfections and natural skin texture, everyday casual home environment)
- Anchor Character Identity: ${anchorCharacterEn || hairInput || 'Long wavy platinum-blonde hair, non-porcelain natural skin texture'} (${anchorCharacterTr || ''})
- Hair Color & Style: ${hairInput || 'Long wavy platinum-blonde hair'}
- Outfit & Heels Combination: ${outfitInput || 'Chic black lace corset two-piece evening ensemble and stiletto high heels'}
- Everyday Home Setting: ${settingInput || 'Everyday casual home bedroom with full-length mirror and dim household lamp'}
- Verification Sign Text: Line 1 "${verificationHeader}", Line 2 "${verificationDate}", Line 3 "${cleanWebText}" ("${threeLineDisplay}")
- Video Motion Choreography: ${motionChoreographyEn} (${resolvedFps}fps, ${resolvedVideoSpeed}x speed)
- Global Negative Prompt Terms: ${globalNegativePrompt || 'uncanny valley, plastic skin, porcelain doll skin, distorted jawline, over-tanned, exaggerated features, shifting face, deformed hands, extra fingers'}
- Additional Notes: ${customNotes || 'Ensure raw smartphone flash candid look, non-porcelain skin with slight imperfections, everyday home environment, timed camera path sequence, environment-matched auto-lighting, advanced style filter keyword weights, explicit ' + resolvedFps + 'fps frame rate, and ' + resolvedVideoSpeed + 'x motion speed directive in the video prompt.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            packageTitleTr: { type: Type.STRING },
            characterAnchorEn: { type: Type.STRING },
            characterAnchorTr: { type: Type.STRING },
            videoPrompt: {
              type: Type.OBJECT,
              properties: {
                runwayEn: { type: Type.STRING },
                klingEn: { type: Type.STRING },
                lumaEn: { type: Type.STRING },
                scenarioTr: { type: Type.STRING },
              },
              required: ['runwayEn', 'klingEn', 'lumaEn', 'scenarioTr'],
            },
            verificationPhotoPrompt: {
              type: Type.OBJECT,
              properties: {
                midjourneyEn: { type: Type.STRING },
                dalleEn: { type: Type.STRING },
                descriptionTr: { type: Type.STRING },
              },
              required: ['midjourneyEn', 'dalleEn', 'descriptionTr'],
            },
            galleryPrompts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  poseNumber: { type: Type.INTEGER },
                  poseTitleTr: { type: Type.STRING },
                  poseTitleEn: { type: Type.STRING },
                  promptEn: { type: Type.STRING },
                  descriptionTr: { type: Type.STRING },
                },
                required: [
                  'poseNumber',
                  'poseTitleTr',
                  'poseTitleEn',
                  'promptEn',
                  'descriptionTr',
                ],
              },
            },
          },
          required: [
            'packageTitleTr',
            'characterAnchorEn',
            'characterAnchorTr',
            'videoPrompt',
            'verificationPhotoPrompt',
            'galleryPrompts',
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Model boş yanıt döndürdü.');
    }

    res.json(JSON.parse(rawText));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Paket üretimi sırasında hata oluştu.';
    res.status(500).json({ error: message });
  }
});

app.post('/api/compress-prompt', async (req, res) => {
  try {
    const ai = getAiClient();
    const { promptText = '', negativePrompt = '' } = req.body || {};
    if (!promptText.trim()) {
      res.status(400).json({ error: 'Sıkıştırılacak prompt metni boş olamaz.' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Compress the following vertical 9:16 4K video generation prompt by removing redundant filler words while strictly preserving:
1) 9:16 aspect ratio, 4K UHD, Fujifilm 400 film grain, natural skin texture with visible pores (no plastic/airbrushed skin), consistent facial identity
2) Exact character look, hair, wardrobe & high heels, and indoor setting
3) Camera speed, motion intensity, lighting mood, verification card style with exact 3-line text, finger-to-lips "shh" gesture, and 180/360 turn choreography
4) Append the negative prompt at the very end: --no ${negativePrompt || 'deformed face, ugly, distorted facial features, plastic airbrushed skin, bad anatomy, asymmetric eyes, blurry, extra fingers, mutated hands, cartoon, 3D render, anime, oversaturated neon lighting, watermark, UI overlay'}

Original Prompt:
${promptText}`,
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            compressedPromptEn: { type: Type.STRING },
          },
          required: ['compressedPromptEn'],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Model boş yanıt döndürdü.');
    }

    res.json(JSON.parse(rawText));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Prompt sıkıştırma sırasında hata oluştu.';
    res.status(500).json({ error: message });
  }
});

// AI-Powered Visual Quality Score (0-100) & Missing Detail Warning Analysis Endpoint
app.post('/api/analyze-video-quality', async (req, res) => {
  try {
    const ai = getAiClient();
    const {
      videoPromptEn = '',
      scenarioTr = '',
      turnAngle = 'soft',
      fps = 24,
      cameraPathOptimized = true,
      verificationHeader = 'VERIFIED',
      verificationDate = '04.10.2026',
      verificationWebsite = '',
      frameDataUrl = '',
    } = req.body || {};

    const parts: Array<
      | { text: string }
      | { inlineData: { data: string; mimeType: string } }
    > = [];

    const parsedFrame = parseDataUrl(frameDataUrl);
    if (parsedFrame) {
      parts.push({
        inlineData: {
          data: parsedFrame.data,
          mimeType: parsedFrame.mimeType,
        },
      });
    }

    parts.push({
      text: `Analyze this vertical 9:16 video preview frame (if attached) and video production prompt for visual quality, detail density, and adherence to our studio standards:
1. Non-porcelain natural skin texture with slight imperfections and visible pores (no plastic/airbrushed look).
2. Raw smartphone camera flash candid aesthetic in a low-light everyday home environment.
3. 3-line handwritten verification paper legibility (Line 1: "${verificationHeader}", Line 2: "${verificationDate}", Line 3: "${verificationWebsite}").
4. Camera Path Optimization & Timed Action Sequence for Motion Style "${turnAngle}" at ${fps} FPS (Camera Path Optimization enabled: ${Boolean(cameraPathOptimized)}).

Video Prompt (EN):
${videoPromptEn}

Scenario (TR):
${scenarioTr}

Return a JSON object in Turkish with scores from 0 to 100 and any missing detail warnings (0 to 3 items). If everything is well-specified and high quality, give an overallScore between 94 and 99 and an empty or minimal missingDetails array with actionable micro-enhancements.`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            skinNaturalnessScore: { type: Type.INTEGER },
            phoneFlashRealismScore: { type: Type.INTEGER },
            verificationCardScore: { type: Type.INTEGER },
            cameraPathMotionScore: { type: Type.INTEGER },
            summaryTr: { type: Type.STRING },
            missingDetails: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  titleTr: { type: Type.STRING },
                  descriptionTr: { type: Type.STRING },
                  actionLabelTr: { type: Type.STRING },
                  snippetEn: { type: Type.STRING },
                },
                required: ['id', 'titleTr', 'descriptionTr', 'actionLabelTr', 'snippetEn'],
              },
            },
          },
          required: [
            'overallScore',
            'skinNaturalnessScore',
            'phoneFlashRealismScore',
            'verificationCardScore',
            'cameraPathMotionScore',
            'summaryTr',
            'missingDetails',
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Kalite analizi yanıtı alınamadı.');
    }

    res.json(JSON.parse(rawText));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Görsel kalite analizi sırasında hata oluştu.';
    res.status(500).json({ error: message });
  }
});

// 9:16 Photorealistic Image Generation Endpoint (Verification Photo & 6 Gallery Poses)
app.post('/api/generate-image', async (req, res) => {
  try {
    const ai = getAiClient();
    const {
      prompt = '',
      model = 'gemini-3.1-flash-lite-image',
      imageSize = '1K',
      referenceImageDataUrl = '',
    } = req.body || {};

    if (!prompt.trim()) {
      res.status(400).json({ error: 'Görsel üretimi için prompt metni gereklidir.' });
      return;
    }

    const cleanedPrompt = cleanPromptForMediaGeneration(prompt);
    const chosenModel =
      model === 'gemini-nano-banana-2.1' || model === 'gemini-3-pro-image'
        ? model
        : 'gemini-3.1-flash-lite-image';

    const parts: Array<
      | { text: string }
      | { inlineData: { data: string; mimeType: string } }
    > = [];

    const parsedRef = parseDataUrl(referenceImageDataUrl);
    if (parsedRef) {
      parts.push({
        inlineData: {
          data: parsedRef.data,
          mimeType: parsedRef.mimeType,
        },
      });
      parts.push({
        text: `Maintain 100% identical facial features, character identity, hair, and outfit from the reference image. Generate a vertical 9:16 photorealistic photograph with Fujifilm 400 film grain: ${cleanedPrompt}`,
      });
    } else {
      parts.push({
        text: cleanedPrompt,
      });
    }

    const imageConfig: { aspectRatio: string; imageSize?: string } = {
      aspectRatio: '9:16',
    };
    if (chosenModel === 'gemini-nano-banana-2.1' || chosenModel === 'gemini-3-pro-image') {
      imageConfig.imageSize =
        imageSize === '4K' || imageSize === '2K' ? imageSize : '1K';
    }

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents: { parts },
      config: {
        imageConfig,
      },
    });

    const candidateParts = response.candidates?.[0]?.content?.parts || [];
    let generatedImageUrl = '';

    for (const part of candidateParts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!generatedImageUrl) {
      throw new Error('Model görsel verisi döndürmedi. Lütfen tekrar deneyin.');
    }

    res.json({
      imageUrl: generatedImageUrl,
      modelUsed: chosenModel,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Görsel üretimi sırasında hata oluştu.';
    res.status(500).json({ error: message });
  }
});

// Step 1: Start 9:16 Video Generation (Veo 3.1 Pro / High-Fidelity Default)
app.post('/api/generate-video', async (req, res) => {
  try {
    const ai = getAiClient();
    const {
      prompt = '',
      model = 'veo-3.1-generate-preview',
      resolution = '1080p',
      referenceImageDataUrl = '',
    } = req.body || {};

    if (!prompt.trim()) {
      res.status(400).json({ error: 'Video üretimi için prompt metni gereklidir.' });
      return;
    }

    const cleanedPrompt = cleanPromptForMediaGeneration(prompt);
    const chosenModel =
      model === 'veo-3.1-lite-generate-preview'
        ? 'veo-3.1-lite-generate-preview'
        : 'veo-3.1-generate-preview';

    const parsedRef = parseDataUrl(referenceImageDataUrl);
    let resolvedResolution: '720p' | '1080p' | '4k' = '1080p';
    if (chosenModel === 'veo-3.1-generate-preview') {
      resolvedResolution =
        resolution === '4k' || resolution === '720p' ? resolution : '1080p';
    } else {
      resolvedResolution = parsedRef || resolution === '720p' ? '720p' : '1080p';
    }

    const operation = await ai.models.generateVideos({
      model: chosenModel,
      prompt: cleanedPrompt,
      ...(parsedRef
        ? {
            image: {
              imageBytes: parsedRef.data,
              mimeType: parsedRef.mimeType,
            },
          }
        : {}),
      config: {
        numberOfVideos: 1,
        resolution: resolvedResolution,
        aspectRatio: '9:16',
      },
    });

    res.json({
      operationName: operation.name,
      modelUsed: chosenModel,
      resolutionUsed: resolvedResolution,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Video üretimi başlatılırken hata oluştu.';
    res.status(500).json({ error: message });
  }
});

// Step 2: Poll 9:16 Video Generation Status
app.post('/api/video-status', async (req, res) => {
  try {
    const ai = getAiClient();
    const { operationName = '' } = req.body || {};
    if (!operationName) {
      res.status(400).json({ error: 'operationName parametresi gereklidir.' });
      return;
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    if (updated.error) {
      res.json({
        done: true,
        error:
          typeof updated.error === 'object' && updated.error !== null && 'message' in updated.error
            ? String((updated.error as { message?: unknown }).message)
            : 'Video sentezi sırasında model hatası oluştu.',
      });
      return;
    }

    res.json({
      done: Boolean(updated.done),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Video durumu sorgulanırken hata oluştu.';
    res.status(500).json({ error: message });
  }
});

// Step 3: Download & Stream Completed 9:16 MP4 Video
app.post('/api/video-download', async (req, res) => {
  try {
    const ai = getAiClient();
    const { operationName = '' } = req.body || {};
    if (!operationName) {
      res.status(400).json({ error: 'operationName parametresi gereklidir.' });
      return;
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      res.status(404).json({ error: 'Üretilen video bağlantısı henüz hazır değil.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    const videoRes = await fetch(uri, {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!videoRes.ok || !videoRes.body) {
      throw new Error(`Video akışı alınamadı (${videoRes.status}).`);
    }

    res.setHeader('Content-Type', 'video/mp4');
    await videoRes.body.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        },
      })
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Video indirilirken hata oluştu.';
    if (!res.headersSent) {
      res.status(500).json({ error: message });
    } else {
      res.end();
    }
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();

