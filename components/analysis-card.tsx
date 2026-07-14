import { Text, View } from "react-native";
import { colors } from "@/theme/colors";
import type { CatReport } from "@/types/cat-report";

export function AnalysisCard({ report }: { report: CatReport }) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 28,
        padding: 22,
        gap: 18,
        borderWidth: 1,
        borderColor: colors.separator
      }}
    >
      <View style={{ gap: 8 }}>
        <Text selectable style={{ color: colors.tertiaryLabel, textTransform: "uppercase", letterSpacing: 1.5 }}>
          Ancestry report
        </Text>
        <Text selectable style={{ color: colors.label, fontSize: 34, fontWeight: "700" }}>
          {report.headline}
        </Text>
        <Text selectable style={{ color: colors.secondaryLabel, lineHeight: 24, fontSize: 16 }}>
          {report.visualSummary}
        </Text>
      </View>

      <View style={{ gap: 14 }}>
        <DetailRow label="Likely breed" value={report.likelyBreed} />
        <DetailRow label="Confidence" value={report.confidence} />
        <DetailRow label="Origin region" value={report.originRegion} />
        <DetailRow label="Personality read" value={report.personalityRead} />
      </View>

      <View
        style={{
          gap: 10,
          backgroundColor: colors.cardAccent,
          borderRadius: 22,
          padding: 18
        }}
      >
        <Text selectable style={{ color: colors.label, fontSize: 20, fontWeight: "700" }}>
          Historical story
        </Text>
        <Text selectable style={{ color: colors.secondaryLabel, lineHeight: 24 }}>
          {report.originStory}
        </Text>
      </View>

      <Text selectable style={{ color: colors.tertiaryLabel, lineHeight: 22 }}>
        {report.caveat}
      </Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Text selectable style={{ color: colors.tertiaryLabel, fontSize: 12, textTransform: "uppercase", letterSpacing: 1.1 }}>
        {label}
      </Text>
      <Text selectable style={{ color: colors.label, lineHeight: 23, fontSize: 16 }}>
        {value}
      </Text>
    </View>
  );
}
