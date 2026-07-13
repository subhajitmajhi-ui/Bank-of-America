import React, { ReactNode, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text as RNText,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type AppTextProps = React.ComponentProps<typeof RNText>;

function AppText(props: AppTextProps) {
  const { style, ...rest } = props;
  return (
    <RNText
      {...rest}
      style={[{ fontFamily: 'OpenSans-Regular' }, style]}
    />
  );
}

const Text = AppText;

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.accordionItemContainer}>
      <TouchableOpacity
        style={styles.accordionItemHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.accordionItemTitle}>{title}</Text>

        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#3e3e3e"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.accordionItemBody}>
          {children}
        </View>
      )}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordionItemContainer: {
    // marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderRadius: 8,
    overflow: 'hidden',
    // backgroundColor: '#b40d0d',
    paddingRight: 15,
  },
  accordionItemHeader: {
    paddingVertical: 16,
    // backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionItemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  accordionItemBody: {
    paddingTop: 16,
    backgroundColor: '#fff',
  },
});