import { Text, View } from "react-native";
import { colors } from "@/theme/colors";

export function TraitListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 28,
        padding: 22,
        gap: 14,
        borderWidth: 1,
        borderColor: colors.separator
      }}
    >
      <Text selectable style={{ color: colors.label, fontSize: 24, fontWeight: "700" }}>
        {title}
      </Text>
      <View style={{ gap: 10 }}>
        {items.map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: colors.cardAccent,
              borderRadius: 18,
              paddingVertical: 12,
              paddingHorizontal: 14
            }}
          >
            <Text selectable style={{ color: colors.secondaryLabel, lineHeight: 22 }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
