import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    Text as RNText,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExploreScreen from './ExploreScreen';

type AppTextProps = React.ComponentProps<typeof RNText>;
function AppText(props: AppTextProps) {
    const { style, ...rest } = props;
    return <RNText {...rest} style={[{ fontFamily: 'OpenSans-Regular' }, style]} />;
}
const Text = AppText;

interface Transaction {
    id: string;
    description: string;
    date: string;
    amount: number;
    status: 'Completed' | 'Pending';
}

interface AccountDetailsScreenProps {
    account: {
        title: string;
        accountNumber: string;
        balance: number;
        subtitle: string;
        tag?: string;
        transactionDetails?: Transaction[];
    };
    onBack: () => void;
}

const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({ account, onBack }) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'activity' | 'pay' | 'deposit'>('activity');
    const [showExplore, setShowExplore] = useState(false);

    const transactions: Transaction[] = account.transactionDetails ?? [
        {
            id: '1',
            description: 'Starbucks Coffee #283',
            date: 'Jun 21, 2026',
            amount: -6.42,
            status: 'Completed',
        },
        {
            id: '2',
            description: 'ZELLE received from Sarah Sterling',
            date: 'Jun 20, 2026',
            amount: 150.0,
            status: 'Completed',
        },
        {
            id: '3',
            description: 'Employer Paycheck Direct Deposit',
            date: 'Jun 18, 2026',
            amount: 2450.0,
            status: 'Completed',
        },
    ];

    return (
        <>
            {showExplore ? (
                <ExploreScreen onBack={() => setShowExplore(false)} />
            ) : (
                <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={onBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#0B2C6E" />
                        <Text style={styles.headerLeftText}>Accounts</Text>
                    </Pressable>
                </View>

                <Text style={styles.headerTitle}>Details</Text>

                <Pressable onPress={() => setShowExplore(true)} style={styles.headerRight}>
                    <Text style={styles.navExplore}>Explore</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Account Info Section */}
                <View style={styles.infoSection}>
                    <View style={styles.accountHeader}>
                        <View>
                            <Text style={styles.accountTitle}>{account.title}</Text>
                            <Text style={styles.accountNumber}>...{account.accountNumber}</Text>
                        </View>
                        {account.tag && (
                            <View style={styles.tagBadge}>
                                <Text style={styles.tagText}>{account.tag}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.balanceSection}>
                        <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
                        <Text style={styles.balanceAmount}>
                            ${account.balance.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabsNav}>
                    <Pressable
                        style={[styles.tabNav, activeTab === 'activity' && styles.tabNavActive]}
                        onPress={() => setActiveTab('activity')}
                    >
                        <Text style={[styles.tabNavText, activeTab === 'activity' && styles.tabNavTextActive]}>Activity</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tabNav, activeTab === 'pay' && styles.tabNavActive]}
                        onPress={() => setActiveTab('pay')}
                    >
                        <Text style={[styles.tabNavText, activeTab === 'pay' && styles.tabNavTextActive]}>Pay & Zelle</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tabNav, activeTab === 'deposit' && styles.tabNavActive]}
                        onPress={() => setActiveTab('deposit')}
                    >
                        <Text style={[styles.tabNavText, activeTab === 'deposit' && styles.tabNavTextActive]}>Deposit</Text>
                    </Pressable>
                </View>

                {activeTab === 'activity' && (
                    <>
                        {/* Recent Transactions */}
                        <View style={styles.transactionsSection}>
                            <Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>
                            <View style={styles.transactionsList}>
                                {transactions.map((tx) => (
                                    <View key={tx.id} style={styles.transactionItem}>
                                        <View style={styles.transactionLeft}>
                                            <Text style={styles.transactionDesc}>{tx.description}</Text>
                                            <Text style={styles.transactionDate}>
                                                {tx.date} • <Text style={styles.statusBadge}>{tx.status}</Text>
                                            </Text>
                                        </View>
                                        <Text
                                            style={[
                                                styles.transactionAmount,
                                                tx.amount < 0 ? styles.negative : styles.positive,
                                            ]}
                                        >
                                            {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* View Statements Link */}
                        <Pressable style={styles.statementsLink}>
                            <Ionicons name="open-outline" size={18} color="#0B2C6E" />
                            <Text style={styles.statementsLinkText}>View Statements and Documents</Text>
                        </Pressable>
                    </>
                )}

                {activeTab === 'pay' && (
                    <View style={styles.emptySection}>
                        <Ionicons name="send" size={48} color="#0B2C6E" />
                        <Text style={styles.emptySectionTitle}>Pay & Zelle</Text>
                        <Text style={styles.emptySectionText}>Send money to friends, family, or businesses</Text>
                    </View>
                )}

                {activeTab === 'deposit' && (
                    <View style={styles.emptySection}>
                        <Ionicons name="download" size={48} color="#0B2C6E" />
                        <Text style={styles.emptySectionTitle}>Mobile Deposit</Text>
                        <Text style={styles.emptySectionText}>Deposit checks with your camera</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F6FA' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeftText: { fontSize: 16, fontWeight: '700', color: '#0B2C6E' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: '#0B2C6E' },
    backButton: {
        padding: 4,
        marginRight: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        minWidth: 64,
        alignItems: 'flex-end',
    },
    navExplore: { fontSize: 14, fontWeight: '600', color: '#0B7A0B' },
    content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
    infoSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E7E7E7',
    },
    accountHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    accountTitle: { fontSize: 18, fontWeight: '700', color: '#0B2C6E' },
    accountNumber: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    tagBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0B2C6E',
    },
    tagText: { fontSize: 12, fontWeight: '600', color: '#0B2C6E' },
    balanceSection: {
        borderTopWidth: 1,
        borderTopColor: '#E7E7E7',
        paddingTop: 16,
    },
    balanceLabel: { fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 8 },
    balanceAmount: { fontSize: 32, fontWeight: '800', color: '#111' },
    tabsNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        marginBottom: 16,
    },
    tabNav: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabNavActive: { borderBottomColor: '#E31C23' },
    tabNavText: { fontSize: 13, fontWeight: '600', color: '#959595' },
    tabNavTextActive: { color: '#0B2C6E', fontWeight: '700' },
    transactionsSection: { marginBottom: 16 },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: '#959595', marginBottom: 12 },
    transactionsList: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E7E7E7',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    transactionLeft: { flex: 1 },
    transactionDesc: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 4 },
    transactionDate: { fontSize: 12, color: '#959595' },
    statusBadge: { color: '#0B7A0B', fontWeight: '600' },
    transactionAmount: { fontSize: 14, fontWeight: '700', marginLeft: 12 },
    negative: { color: '#D51C2A' },
    positive: { color: '#0B7A0B' },
    statementsLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        gap: 8,
        marginBottom: 16,
    },
    statementsLinkText: { fontSize: 14, fontWeight: '600', color: '#0B2C6E' },
    emptySection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        marginBottom: 16,
    },
    emptySectionTitle: { fontSize: 16, fontWeight: '700', color: '#0B2C6E', marginTop: 16, marginBottom: 8 },
    emptySectionText: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
    exploreSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#E7E7E7',
    },
    exploreText: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
});

export default AccountDetailsScreen;
