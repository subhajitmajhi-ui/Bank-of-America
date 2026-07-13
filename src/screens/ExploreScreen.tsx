import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    Text as RNText,
    Image,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AppTextProps = React.ComponentProps<typeof RNText>;
function AppText(props: AppTextProps) {
    const { style, ...rest } = props;
    return <RNText {...rest} style={[{ fontFamily: 'OpenSans-Regular' }, style]} />;
}
const Text = AppText;

interface Product {
    id: string;
    name: string;
    icon: string;
}

interface ExploreScreenProps {
    onBack: () => void;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ onBack }) => {
    const insets = useSafeAreaInsets();

    const products: Product[] = [
        { id: '1', name: 'Checking', icon: 'cash-outline' },
        { id: '2', name: 'Credit Cards', icon: 'card-outline' },
        { id: '3', name: 'Savings', icon: 'wallet-outline' },
        { id: '4', name: 'Auto', icon: 'car-sport-outline' },
        { id: '5', name: 'Mortgage', icon: 'home-outline' },
        { id: '6', name: 'Refinance', icon: 'document-text-outline' },
        { id: '7', name: 'Home Equity', icon: 'business-outline' },
    ];

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={onBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#7A7A7A" />
                </Pressable>
                <Text style={styles.headerTitle}>Explore Our Products</Text>
                <Ionicons name="lock-closed" size={18} color="#7A7A7A" />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Subtitle */}
                <View style={styles.subtitleStrip}>
                    <Text style={styles.subtitle}>Choose an account that fits your needs.</Text>
                </View>

                {/* Bank Logo Section */}
                <View style={styles.bankSection}>
                    <Image
                        source={require('../../assets/images/bank-of-america-only-logo.png')}
                        style={styles.bankLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.bankText}>PROVIDED BY BANK OF AMERICA</Text>
                </View>

                {/* Products List */}
                <View style={styles.productsList}>
                    {products.map((product) => (
                        <Pressable
                            key={product.id}
                            style={({ pressed }) => [
                                styles.productItem,
                                pressed && styles.productItemPressed,
                            ]}
                        >
                            <View style={styles.productLabelCol}>
                                <Text style={styles.productName}>{product.name}</Text>
                            </View>
                            <View style={styles.productIconCol}>
                                <Ionicons
                                    name={product.icon as any}
                                    size={50}
                                    color="#0B2C6E"
                                />
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFEFEF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
    },
    headerTitle: { fontSize: 38/2, fontWeight: '500', color: '#6A6A6A' },
    backButton: { padding: 4 },
    content: { paddingBottom: 24 },
    subtitleStrip: {
        backgroundColor: '#F3F3F3',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    subtitle: { fontSize: 12, color: '#666666', fontWeight: '500' },
    bankSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: '#EFEFEF',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
    },
    bankLogo: {
        width: 50,
        height: 26,
    },
    bankText: { fontSize: 14, fontWeight: '500', color: '#666666', letterSpacing: 0.2 },
    productsList: { backgroundColor: '#EFEFEF' },
    productItem: {
        flexDirection: 'row',
        alignItems: 'stretch',
        minHeight: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
    },
    productItemPressed: { opacity: 0.6 },
    productLabelCol: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 12,
    },
    productName: { fontSize: 14, fontWeight: '500', color: '#1A1A1A' },
    productIconCol: {
        width: 140,
        backgroundColor: '#F9F9F9',
        borderLeftWidth: 1,
        borderLeftColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ExploreScreen;
