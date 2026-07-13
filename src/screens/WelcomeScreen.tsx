import React from 'react';
import {
    StyleSheet,
    View,
    Text as RNText,
    Pressable,
    SafeAreaView,
    Image,
    ScrollView,
    Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AppTextProps = React.ComponentProps<typeof RNText>;

function AppText(props: AppTextProps) {
    const { style, ...rest } = props;

    return <RNText {...rest} style={[{ fontFamily: 'OpenSans-Regular' }, style]} />;
}

const Text = AppText;

interface WelcomeCard {
    title: string;
    subtitle: string;
}

interface WelcomeScreenProps {
    onBack: () => void;
    onLogin: () => void;
    onExplore: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBack, onLogin, onExplore }) => {
    const insets = useSafeAreaInsets();

    const welcomeCards: WelcomeCard[] = [
        {
            title: "I'm at a financial center or with a bank associate right now",
            subtitle: "Get ready to apply for a product with help.",
        },
        {
            title: "Create my login",
            subtitle: "I have a Bank of America account, but I need to set up online access.",
        },
        {
            title: "Explore products & open account",
            subtitle: "Learn about and apply for credit cards, deposit accounts, loans and more.",
        },
    ];

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable onPress={onBack} style={styles.backButton}>
                    <Image
                        source={require('../../assets/images/left-chevron.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </Pressable>
                <Text style={styles.headerTitle}>Welcome</Text>
                <View style={{ width: 30 }} />
            </View>

            <LinearGradient
                colors={['rgba(0,0,0,0.12)', 'rgba(0,0,0,0)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.headerGradient}
            />


            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/bank-of-america-only-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.mainTitle}>Welcome to</Text>
                <Text style={styles.mainTitleBottom}>Bank of America</Text>

                <View style={styles.cardsContainer}>
                    {welcomeCards.map((card, index) => (
                        <Pressable
                            key={index}
                            style={styles.card}
                            onPress={() => {
                                if (index === 0) {
                                    Linking.openURL('https://secure.bankofamerica.com/onboard/das/olb/beginenroll/#/getstarted');
                                } else if (index === 1) {
                                    onLogin();
                                } else if (index === 2) {
                                    onExplore();
                                }
                            }}
                        >
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                        </Pressable>
                    ))}
                </View>

                <View style={styles.legalSection}>
                    <Text style={styles.legalTitle}>Legal info and disclosures</Text>
                    <Text style={styles.legalSubtitle}>
                        Investment, insurance and annuity products:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Are Not FDIC Insured</Text>
                        <Text style={styles.bulletItem}>• Are Not Bank Guaranteed</Text>
                        <Text style={styles.bulletItem}>• May Lose Value</Text>
                        <Text style={styles.bulletItem}>• Are Not Deposits</Text>
                        <Text style={styles.bulletItem}>• Are Not Insured by Any Federal Government Agency</Text>
                        <Text style={styles.bulletItem}>• Are Not a Condition to Any Banking Service or Activity</Text>
                    </View>
                    <View style={styles.legalSection2}>
                        <Text style={styles.legalSubtitle}>
                            Investing involves risk. There is always the potential of losing money when you invest in securities. Asset allocation, diversification, and rebalancing do not ensure a profit or protect against loss in declining markets.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            BofA Bank, its affiliates, and financial advisors do not provide legal, tax, or accounting advice. Clients should consult their legal and/or tax advisors before making any financial decisions.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            BofA Bank offers a broad range of brokerage, investment advisory, wealth management, and other financial services. Additional information is available in our <Text style={styles.linkText}>Client Relationship Summary</Text>.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            BofA Bank Securities, Inc. (also referred to as "BofA Securities") makes available certain investment products that are sponsored, managed, distributed, or provided by companies affiliated with BofA Bank Corporation. BofA Securities is a registered broker-dealer and registered investment adviser and is a wholly owned subsidiary of BofA Bank Corporation.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            Insurance and annuity products are offered through BofA Bank Insurance Services, Inc., a licensed insurance agency and wholly owned subsidiary of BofA Bank Corporation.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            BofA Private Bank is a division of BofA Bank, N.A. Trust, fiduciary, and investment management services are offered through BofA Bank, N.A. and its affiliated trust companies, which are wholly owned subsidiaries of BofA Bank Corporation.
                        </Text>
                        <Text style={styles.legalSubtitle}>
                            Banking products are provided by BofA Bank, N.A. and affiliated financial institutions that are wholly owned subsidiaries of BofA Bank Corporation.
                        </Text>
                        <Text style={styles.linkText}>
                            See additional information about BofA Bank and its financial services.
                        </Text>
                    </View>

                    <View style={styles.legalSection3}>
                        <Text style={styles.listLinkText}>Browse with a Specialist</Text>
                        <Text style={styles.listLinkText}>Accessible Banking</Text>
                        <Text style={styles.listLinkText}>Security</Text>
                        <Text style={styles.listLinkText}>Privacy</Text>
                        <Text style={styles.listLinkText}>Children's Privacy</Text>
                        <Text style={styles.listLinkText}>Your Privacy Choices</Text>
                        <Text style={styles.listLinkText}>AdChoices</Text>
                        <Text style={styles.listLinkText}>Legal Information & Disclosures</Text>
                        <Text style={styles.listLinkText}>Equal Housing Lender</Text>
                    </View>

                    <View style={styles.legalSection3}>
                        <Text style={styles.copyrightText}>Bank Of America N.A. Member FDIC © 2026 BofA Bank Corporation.</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerGradient: {
        height: 20,
        width: '100%',
        marginTop: 0,
        position: 'relative',
        zIndex: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        position: 'relative',
        zIndex: 1,
        // backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 28,
        color: '#6a6a6a',
        fontWeight: '300',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6a6a6a',
        flex: 1,
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 80,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 0,
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    mainTitleBottom:{
       fontSize: 22,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 30,
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
    cardsContainer: {
        marginBottom: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
        lineHeight: 22,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#666666',
        lineHeight: 20,
    },
    legalSection: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        paddingTop: 30,
    },
    legalSection2: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        paddingTop: 20,
    },
    legalSection3: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        paddingTop: 20,
    },
    linkText: {
        fontSize: 12,
        color: '#0c5dae',
        fontWeight: '700',
    },
    listLinkText: {
        fontSize: 12,
        color: '#0c5dae',
        fontWeight: '700',
        marginBottom: 15,
    },
    legalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 12,
    },
    legalSubtitle: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 12,
        lineHeight: 18,
    },
    bulletList: {
        marginLeft: 8,
    },
    bulletItem: {
        fontSize: 13,
        color: '#666666',
        marginBottom: 6,
        lineHeight: 18,
    },
    copyrightText: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
    },
});

export default WelcomeScreen;
