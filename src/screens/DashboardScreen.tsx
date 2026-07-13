import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    Text as RNText,
    TextInput,
    BackHandler,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppDrawer from '../components/AppDrawer';
import DrawerContent from '../components/DrawerContent';
import BottomNavigation, { BottomTab } from '../components/BottomNavigation';
import AccountDetailsScreen from './AccountDetailsScreen';

type AppTextProps = React.ComponentProps<typeof RNText>;
function AppText(props: AppTextProps) {
    const { style, ...rest } = props;
    return <RNText {...rest} style={[{ fontFamily: 'OpenSans-Regular' }, style]} />;
}
const Text = AppText;

interface DashboardScreenProps {
    onBack: () => void;
}

interface Account {
    id: string;
    title: string;
    accountNumber: string;
    balance: number;
    subtitle: string;
    tag?: string;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onBack }) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'accounts' | 'dashboard'>('accounts');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [bottomTab, setBottomTab] = useState<BottomTab>('home');
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            if (drawerVisible) {
                setDrawerVisible(false);
                return true;
            }

            if (selectedAccount) {
                setSelectedAccount(null);
                return true;
            }

            return false;
        });

        return () => subscription.remove();
    }, [drawerVisible, selectedAccount]);

    const accounts: Account[] = [
        {
            id: '1',
            title: 'BANKING',
            accountNumber: '4829',
            balance: 8000.00,
            subtitle: 'Checking and Savings (2 accounts)',
        },
        {
            id: '2',
            title: 'CREDIT CARDS',
            accountNumber: '2184',
            balance: 4000.50,
            subtitle: 'Rewards Visa (...2184)',
            tag: 'checking',
        },
        {
            id: '3',
            title: 'LOANS',
            accountNumber: '0941',
            balance: 7000.00,
            subtitle: 'Auto Loan (...0941)',
        },
        {
            id: '4',
            title: 'INVESTMENTS',
            accountNumber: '5502',
            balance: 45550.25,
            subtitle: 'Merrill Brokerage (...5502)',
        },
    ];

    return (
        <>
            {selectedAccount ? (
                <AccountDetailsScreen
                    account={selectedAccount}
                    onBack={() => setSelectedAccount(null)}
                />
            ) : (
                <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.topBar}>

                <Pressable
                    onPress={() => setDrawerVisible(true)}
                    style={styles.menuButton}>
                    <Ionicons
                        name="menu-outline"
                        size={26}
                        color="#0B2C6E"
                    />
                    <Text style={styles.menuText}>Menu</Text>
                </Pressable>
                <View style={styles.topBarIconsSet}>
                    {/* <Pressable onPress={onBack} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#0B2C6E" />
                    </Pressable> */}
                    <Pressable>
                        <Ionicons name="notifications-outline" size={24} color="#0B2C6E" />
                        <Text style={styles.menuItemTextAlert}>4</Text>
                    </Pressable>
                    <Pressable>
                        <Ionicons name="podium-outline" size={24} color="#0B2C6E" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="power-outline" size={24} color="#0B2C6E" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.tabBar}>
                <Pressable
                    style={[styles.tabItem, activeTab === 'accounts' && styles.tabItemActive]}
                    onPress={() => setActiveTab('accounts')}
                >
                    <Text style={[styles.tabText, activeTab === 'accounts' && styles.tabTextActive]}>Accounts</Text>
                </Pressable>
                <Pressable
                    style={[styles.tabItem, activeTab === 'dashboard' && styles.tabItemActive]}
                    onPress={() => setActiveTab('dashboard')}
                >
                    <Text style={[styles.tabText, activeTab === 'dashboard' && styles.tabTextActive]}>Dashboard</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.searchSection}>
                    <View style={styles.searchInputWrap}>
                        <Ionicons name="search-outline" size={20} color="#8C8C8C" />
                        <TextInput
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Hi I'm Erica. How can I help?"
                            placeholderTextColor="#8C8C8C"
                        />
                    </View>
                    <Pressable style={styles.ericaButton}>
                        <Ionicons name="chatbubbles" size={18} color="#FFFFFF" />
                        <View style={styles.ericaBadge}>
                            <Text style={styles.ericaBadgeText}>1</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.quickLinksCard}>
                    <Pressable style={styles.quickLinkRow}>
                        <Text style={styles.helloText}>Hello, Henry Sterling</Text>
                        <Ionicons name="chevron-forward" size={20} color="#B5B5B5" />
                    </Pressable>
                    <Pressable style={styles.quickLinkRow}>
                        <Text style={styles.quickLinkText}>My Rewards</Text>
                        <Ionicons name="chevron-forward" size={20} color="#B5B5B5" />
                    </Pressable>
                    <Pressable style={[styles.quickLinkRow, styles.quickLinkLastRow]}>
                        <View style={styles.contactRowLeft}>
                            <Ionicons name="chatbox-ellipses-outline" size={19} color="#0B2C6E" />
                            <Text style={styles.quickLinkText}>Contact Us</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#B5B5B5" />
                    </Pressable>
                </View>

                <View style={styles.netWorthRow}>
                    <Pressable style={styles.netWorthButton}>
                        <Text style={styles.netWorthText}>Show Net Worth</Text>
                        <Ionicons name="settings-outline" size={20} color="#4B77B1" />
                    </Pressable>
                </View>

                <View style={styles.cardsSection}>
                    {accounts.map((account) => (
                        <Pressable
                            key={account.id}
                            onPress={() => setSelectedAccount(account)}
                            style={({ pressed }) => [
                                styles.accountCard,
                                pressed && styles.accountCardPressed,
                            ]}
                        >
                            <View style={styles.cardTopBorder}>
                                <View style={styles.cardTopBlue} />
                                <View style={styles.cardTopRed} />
                            </View>

                            <View style={styles.cardContent}>
                                <View style={styles.cardMainRow}>
                                    <View style={styles.cardTextColumn}>
                                        <Text style={styles.cardTitle}>{account.title}</Text>
                                        <Text style={styles.cardSubtitle}>
                                            {account.subtitle}
                                        </Text>
                                    </View>

                                    <View style={styles.cardAmountColumn}>
                                        <Text style={styles.cardValue}>${account.balance.toFixed(2)}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardChevronWrap}>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color="#0B2C6E"
                                        style={styles.cardChevron}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {activeTab === 'accounts' ? (
                    <View style={styles.informationSection}>
                        <View style={styles.informationRow}>
                            <Ionicons name="information-circle-outline" size={20} color="#0B2C6E" />
                            <Text style={styles.informationText}><Text style={{ fontWeight: '700' }}>FICO Score Update:</Text> Your recent loan repayment boosted your score! Tap <Text style={{ fontWeight: '700' }}>Menu {'>'} View FICO® Score</Text> to analyze credit metrics.</Text>
                        </View>
                    </View>
                ) : null}

                {activeTab === 'dashboard' ? (
                    <View style={styles.dashboardSection}>
                        <View style={styles.dashboardRow}>
                            <Ionicons name="trending-up" size={20} color="#0B2C6E" />
                            <Text style={styles.dashboardText}>Portfolio trending up</Text>
                        </View>
                        <View style={styles.dashboardRow}>
                            <Ionicons name="calendar" size={20} color="#0B2C6E" />
                            <Text style={styles.dashboardText}>Payments due in 3 days</Text>
                        </View>
                        <View style={styles.dashboardRow}>
                            <Ionicons name="shield-checkmark" size={20} color="#0B2C6E" />
                            <Text style={styles.dashboardText}>Security score is excellent</Text>
                        </View>
                    </View>
                ) : null}
            </ScrollView>

            <AppDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
            >
                <DrawerContent onClose={() => setDrawerVisible(false)} />
            </AppDrawer>

            <BottomNavigation
                activeTab={bottomTab}
                onTabPress={setBottomTab}
                />
        </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F6FA' },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E7E7E7' },
    menuButton: { padding: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 },
    menuText: { fontSize: 14, color: '#0B2C6E', fontWeight: '700' },
    closeButton: { padding: 8 },
    topBarTitle: { fontSize: 18, fontWeight: '700', color: '#0B2C6E' },
    tabBar: { flexDirection: 'row', backgroundColor: '#fff', marginTop: 0, marginHorizontal: 0, borderRadius: 0, overflow: 'hidden' },
    tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#E31C23' },
    tabText: { fontSize: 17, color: '#959595', fontWeight: '700' },
    tabTextActive: { color: '#00387A' },
    content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    searchInputWrap: {
        flex: 1,
        minHeight: 42,
        borderRadius: 16,
        backgroundColor: '#F1F1F1',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
        paddingVertical: 8,
    },
    ericaButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#D61B39',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    ericaBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#146DD9',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ericaBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '700',
    },
    quickLinksCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        overflow: 'hidden',
        marginBottom: 20,
    },
    quickLinkRow: {
        minHeight: 56,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
    },
    quickLinkLastRow: {
        borderBottomWidth: 0,
    },
    helloText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111111',
    },
    quickLinkText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222222',
    },
    contactRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    netWorthRow: {
        marginBottom: 12,
        alignItems: 'flex-end',
    },
    netWorthButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    netWorthText: {
        fontSize: 14,
        color: '#4B77B1',
        fontWeight: '600',
    },
    cardsSection: { gap: 10 },
    accountCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden', // important
        borderWidth: 1,
        borderColor: '#0B2C6E',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 6,
    },
    accountCardPressed: {
        opacity: 0.7,
    },
    cardContent: {
        padding: 16,
        position: 'relative',
        paddingRight: 34,
    },

    cardTopBorder: {
        flexDirection: 'row',
        height: 4,
    },

    cardTopBlue: {
        flex: 1,
        backgroundColor: '#0B2C6E',
    },

    cardTopRed: {
        flex: 1,
        backgroundColor: '#E31C23',
    },
    cardMainRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardTextColumn: { flex: 1, paddingRight: 8 },
    cardAmountColumn: { alignItems: 'flex-end', justifyContent: 'center' },
    cardTitle: { fontSize: 14, fontWeight: '700', color: '#0B2C6E' },
    cardValue: { fontSize: 20, fontWeight: '800', color: '#111' },
    cardSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 6 },
    cardChevronWrap: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    cardChevron: {
        textAlignVertical: 'center',
    },
    dashboardSection: { marginTop: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16 },
    dashboardRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 14 },
    informationSection: { marginTop: 16, },
    informationRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 14, backgroundColor: '#ecf5fd', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#0B2C6E'},
    informationText: { fontSize: 14, color: '#0c5dae', paddingRight: 8, flex: 1 },
    dashboardText: { fontSize: 14, color: '#111' },
    menuOverlay: { position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-start' },
    menuPanel: { backgroundColor: '#fff', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
    menuTitle: { fontSize: 18, fontWeight: '700', color: '#0B2C6E' },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
    menuItemText: { fontSize: 14, color: '#0B2C6E' },
    topBarIconsSet: { flexDirection: 'row', gap: 16 },
    menuItemTextAlert: { fontSize: 10, color: '#fff', fontWeight: '700', position: 'absolute', top: -4, right: -4, backgroundColor: '#D51C2A', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 },
});

export default DashboardScreen;
