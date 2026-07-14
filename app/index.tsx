import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { AnalysisCard } from "@/components/analysis-card";
import { HeroCard } from "@/components/hero-card";
import { TraitListCard } from "@/components/trait-list-card";
import { analyzeCatPhoto, ApiError } from "@/services/analyze-cat";
import { colors } from "@/theme/colors";
import type { CatReport } from "@/types/cat-report";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 760;
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [report, setReport] = useState<CatReport | null>(null);
  const [status, setStatus] = useState("Pick a cat portrait to generate a lineage read.");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePickPhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Photo access needed", "Please allow photo access to analyze a cat image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
      aspect: [4, 5]
    });

    if (result.canceled || !result.assets[0]?.uri) {
      return;
    }

    if (process.env.EXPO_OS === "ios") {
      await Haptics.selectionAsync();
    }

    setImageUri(result.assets[0].uri);
    setReport(null);
    setStatus("Photo ready. Run the ancestry scan when you're set.");
  }

  async function handleAnalyze() {
    if (!imageUri) {
      return;
    }

    setIsLoading(true);
    setStatus("Reading coat pattern, face shape, and breed lineage clues...");

    try {
      const nextReport = await analyzeCatPhoto(imageUri);
      setReport(nextReport);
      setStatus("Report complete.");

      if (process.env.EXPO_OS === "ios") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Something went wrong during analysis.";
      setStatus(message);
      Alert.alert("Analysis failed", message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 20,
        backgroundColor: colors.canvas
      }}
    >
      <HeroCard />

      <View
        style={{
          gap: 20,
          flexDirection: isCompact ? "column" : "row",
          alignItems: "stretch"
        }}
      >
        <View
          style={{
            flex: isCompact ? undefined : 0.95,
            gap: 16
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 28,
              padding: 18,
              gap: 16,
              borderWidth: 1,
              borderColor: colors.separator
            }}
          >
            <Text
              selectable
              style={{
                color: colors.label,
                fontSize: 28,
                fontWeight: "700"
              }}
            >
              Scan your cat
            </Text>

            <Text
              selectable
              style={{
                color: colors.secondaryLabel,
                lineHeight: 22
              }}
            >
              Start with a clear face or full-body shot. This starter is wired for mobile-first photo
              selection and can connect to a real AI backend when you're ready.
            </Text>

            <Pressable
              onPress={handlePickPhoto}
              style={({ pressed }) => ({
                minHeight: 360,
                borderRadius: 24,
                borderWidth: 1.5,
                borderColor: colors.separator,
                backgroundColor: colors.cardAccent,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.95 : 1,
                transform: [{ scale: pressed ? 0.995 : 1 }]
              })}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: "100%", height: 360 }}
                  contentFit="cover"
                />
              ) : (
                <View style={{ paddingHorizontal: 24, gap: 8 }}>
                  <Text
                    selectable
                    style={{
                      color: colors.label,
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center"
                    }}
                  >
                    Choose a cat portrait
                  </Text>
                  <Text
                    selectable
                    style={{
                      color: colors.secondaryLabel,
                      textAlign: "center",
                      lineHeight: 22
                    }}
                  >
                    Open the photo library and pick the image you want to analyze.
                  </Text>
                </View>
              )}
            </Pressable>

            <Pressable
              disabled={!imageUri || isLoading}
              onPress={handleAnalyze}
              style={({ pressed }) => ({
                borderRadius: 999,
                backgroundColor: !imageUri || isLoading ? colors.disabled : colors.accent,
                paddingVertical: 16,
                paddingHorizontal: 20,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.9 : 1
              })}
            >
              {isLoading ? (
                <ActivityIndicator color="#fffaf2" />
              ) : (
                <Text
                  selectable
                  style={{
                    color: "#fffaf2",
                    fontSize: 16,
                    fontWeight: "700"
                  }}
                >
                  Analyze ancestry
                </Text>
              )}
            </Pressable>

            <Text
              selectable
              style={{
                color: colors.secondaryLabel,
                lineHeight: 22
              }}
            >
              {status}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1.05,
            gap: 16
          }}
        >
          {report ? (
            <>
              <AnalysisCard report={report} />
              <TraitListCard title="Notable traits" items={report.notableTraits} />
              <TraitListCard title="Care tips" items={report.careTips} />
            </>
          ) : (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 28,
                padding: 22,
                gap: 12,
                borderWidth: 1,
                borderColor: colors.separator,
                minHeight: 420,
                justifyContent: "center"
              }}
            >
              <Text
                selectable
                style={{
                  color: colors.label,
                  fontSize: 32,
                  fontWeight: "700"
                }}
              >
                Your report appears here
              </Text>
              <Text
                selectable
                style={{
                  color: colors.secondaryLabel,
                  lineHeight: 24,
                  fontSize: 16
                }}
              >
                The starter already supports the full product shape: photo in, ancestry report out,
                with room for subscriptions, saved scans, onboarding, and breed history expansions.
              </Text>
              <Text
                selectable
                style={{
                  color: colors.tertiaryLabel,
                  lineHeight: 22
                }}
              >
                If no backend URL is configured, the app returns a demo report so the UI is usable on day one.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
