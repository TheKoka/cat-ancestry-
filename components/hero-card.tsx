import { Text, View } from "react-native";
import { colors } from "@/theme/colors";

export function HeroCard() {
  return (
    <View
      style={{
        backgroundColor: colors.hero,
        borderRadius: 32,
        padding: 24,
        gap: 14,
        borderWidth: 1,
        borderColor: colors.heroBorder
      }}
    >
      <Text
        selectable
        style={{
          color: colors.heroEyebrow,
          fontSize: 12,
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: 1.6
        }}
      >
        AI lineage studio
      </Text>
      <Text
        selectable
        style={{
          color: colors.label,
          fontSize: 40,
          lineHeight: 42,
          fontWeight: "800",
          maxWidth: 780
        }}
      >
        Turn one cat photo into a breed guess, origin story, and personality dossier.
      </Text>
      <Text
        selectable
        style={{
          color: colors.secondaryLabel,
          fontSize: 16,
          lineHeight: 24,
          maxWidth: 760
        }}
      >
        This Expo starter gives you the mobile foundation for iOS and Android: native screens,
        photo selection, typed API calls, and an interface shaped for a premium consumer app.
      </Text>
    </View>
  );
}
