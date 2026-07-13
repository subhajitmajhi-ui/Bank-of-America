/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text as RNText,
  Pressable,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
  Button,
  BackHandler,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ExploreScreen from './src/screens/ExploreScreen';

type AppTextProps = React.ComponentProps<typeof RNText>;

function AppText(props: AppTextProps) {
  const { style, ...rest } = props;

  return <RNText {...rest} style={[{fontFamily: 'OpenSans-Regular'}, style]} />;
}

const Text = AppText;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [routeStack, setRouteStack] = useState<string[]>(['home']);
  const [modalVisible, setModalVisible] = useState(true);
  const currentScreen = routeStack[routeStack.length - 1];

  const navigateTo = (screen: string) => {
    setRouteStack(prev => {
      if (prev[prev.length - 1] === screen) {
        return prev;
      }
      return [...prev, screen];
    });
  };

  const goBack = () => {
    setRouteStack(prev => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.slice(0, -1);
    });
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }

      if (routeStack.length > 1) {
        goBack();
        return true;
      }

      return false;
    });

    return () => subscription.remove();
  }, [modalVisible, routeStack.length]);

  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onBack={goBack}
        onLogin={() => navigateTo('login')}
        onExplore={() => navigateTo('explore')}
      />
    );
  }
  if (currentScreen === 'login') {
    return <LoginScreen onBack={goBack} onLogin={() => navigateTo('dashboard')} />;
  }
  if (currentScreen === 'explore') {
    return <ExploreScreen onBack={goBack} />;
  }
  if (currentScreen === 'dashboard') {
    return <DashboardScreen onBack={goBack} />;
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        source={require('./assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('./assets/images/Bank_of_America_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonGroup}>
          <Pressable 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigateTo('welcome')}
          >
            <Text style={styles.primaryButtonText}>GET STARTED</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigateTo('login')}
          >
            <Text style={styles.primaryButtonText}>LOG IN</Text>
          </Pressable>
        </View>

        <Pressable>
          <Text style={styles.linkText}>View Privacy Notice</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
            
              <Image
              source={require('./assets/images/info.png')}
              style={styles.infoImage} />
              <Text style={styles.modalTitle}>End User License Agreement</Text>
              </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                <Text style={styles.innerTitle}>End User License Agreement</Text>

                <Text style={styles.modalSubTitle}>
                  Last Updated: September 5, 2023
                </Text>

                <Text style={styles.modalText}>
                  BEFORE YOU CHOOSE THE “ACCEPT” BUTTON BELOW, CAREFULLY READ THE TERMS AND CONDITIONS OF THIS END USER LICENSE AGREEMENT (“License”). This License relates to your use of the Bank of America Mobile Banking, Bank of America Private Bank, Merrill Edge, MyMerrill, or Benefits OnLine applications (individually and collectively, “Application”) and is subject to your acceptance prior to use. Bank of America, N.A., application provider of Bank of America Mobile Banking and Bank of America Private Bank, and Merrill Lynch, Pierce, Fenner & Smith Incorporated, application provider of Merrill Edge, MyMerrill, and Benefits OnLine, are willing to license the Application to you ONLY IF YOU ACCEPT ALL OF THE TERMS IN THIS LICENSE. Bank of America and Merrill Lynch, Pierce, Fenner & Smith Incorporated (individually and collectively, “Licensor”) shall not make this Application available under any terms or conditions except as stated herein.
                  {"\n\n"}

                  BY CHOOSING THE “ACCEPT” BUTTON YOU: 
                  {"\n\n\n"}
                  <View style={{ paddingLeft: 20}}>
                  <Text style={{paddingTop: 80, paddingBottom: 50, fontSize: 14, lineHeight: 24, color: '#ffffff'}}>
                  • REPRESENT THAT YOU HAVE THE CAPACITY AND AUTHORITY TO BIND YOURSELF TO THE TERMS OF THIS LICENSE; AND
                  {"\n"}• CONSENT TO BE BOUND BY THIS LICENSE
                  {"\n\n"}
                  </Text>
                  </View>
                  {"\n\n\n"}

                  <Text style={styles.modalText}>
                    When you permit someone to use this Application on your device, the License covers any action or uses of this Application by that person. IF YOU DO NOT AGREE TO ALL OF THE TERMS AND CONDITIONS OF THIS LICENSE, CHOOSE THE “DECLINE” BUTTON, IN WHICH CASE YOU WILL NOT AND MAY NOT RECEIVE, INSTALL OR USE THE APPLICATION. For future reference, you may view a copy of this license in the the Legal Info & Disclosures section of the Application. Any use of the Application other than pursuant to the terms of this License is a violation of U.S. and International copyright conventions, breach of contract, and other applicable rights.
                  </Text>

                  {"\n\n"}
                  <View style={{ paddingLeft: 20}}>
                    <Text style={styles.sectionTitle}>
                      1. Grant of License
                    </Text>
                  </View>
                  {"\n\n"}
                  <Text style={styles.modalText}>
                    The Licensor hereby grants you limited, personal, non-exclusive, non-transferable, revocable license to install the Application on your mobile device for your personal use. You may not (and shall not permit or assist any third party to): (i) copy (except as expressly permitted by this License), decompile, reverse engineer, disassemble, attempt to derive the source code, modify, or create derivative works of the Application, any updates, or any part thereof; (ii) rent, lease, lend, sell, redistribute or sublicense the Application; (iii) use the application in any manner that could damage, disable, overburden, or impair the Application (or any server or networks connected to the Application) or interfere with any third party’s use and/or enjoyment of the Application (or any server or networks connected to the Application); (iv) intentionality interfere with or circumvent the Application’s security features; (v) use, test or otherwise utilize the Application in any manner for purposes of developing or implementing any method or software that is intended to monitor or interfere (including intercept or capture data) with the functioning of the Application (or any server or networks connected to the Application); or (vi) otherwise use the Application in any unlawful manner, for any unlawful purpose or in any other manner not expressly granted in this License. The terms of this License will govern any updates provided by the Licensor that replace and/or supplement the original Application. 
                  </Text>
                  {"\n\n"}
                  <Text style={styles.modalText}>
                    Any open source software that may be accompanying the Application is provided to you under the terms of such open source license agreement. This License does not apply to any such open source software accompanying the Application, except as expressly stated herein.
                  </Text>
                  {"\n\n"}
                  <View style={{ paddingLeft: 20}}>
                    <Text style={styles.sectionTitle}>
                      2. Ownership
                    </Text>
                  </View>
                  {"\n\n"}
                  <Text style={styles.modalText}>
                    The software, content, visual interfaces, interactive features, information, graphics, design, compilation, computer code and all other elements of the Applications (the “Materials”) are protected by intellectual property rights—including copyright, trade dress, patent, trade secret and trademark laws of the United States, other jurisdictions, and international conventions, and all other applicable laws (collectively, “Applicable Intellectual Property Laws”). All Materials are the property of the Licensor or its subsidiaries or affiliated companies and/or third-party licensors. The Licensor reserves all rights not expressly granted in this License. You shall not acquire any right, title or interest to the Materials, whether by implication, estoppel, or otherwise, except for the limited rights set forth in this License. You hereby agree to abide by all Applicable Intellectual Property Laws.
                  </Text>
                  {"\n\n"}
                  <View style={{ paddingLeft: 20}}>
                    <Text style={styles.sectionTitle}>
                      3. Privacy and Consent to Use of Data
                    </Text>
                  </View>
                  {"\n\n"}
                  <Text style={styles.modalText}>
                    You agree that the Licensor, its affiliates, and their corresponding service providers may collect, maintain, and use technical data and related information about you and your device as part of the product support services related to the Application. This information may include, but is not limited to, technical information about your device, its settings, IP address, device location, your device’s unique identification number, and pattern of usage. We use this information for fraud prevention and authentication as well as to facilitate the provision of software updates and product support.
                  </Text>
                  {"\n"}
                  <Text style={styles.modalText}>
                    This Application offers certain services that use device location to help bring you a more customized mobile banking experience. These services are optional and will access your device location only when you give permission for the Application to do so. If you consent, we will gather your estimated device location using IP address, GPS, information about nearby wireless access points and the strength of your wireless network, cellular network, or network signal. If you do not give us permission, we will not capture your device location for that service. However, you may not be able to use certain services if you choose not to share your device location. 
                  </Text>
                  {"\n"}
                  <Text style={styles.modalText}>
                    You consent and authorize the Licensor to obtain from your wireless operator (AT&T, Sprint, T-Mobile, US Cellular, Verizon, or any other branded wireless operator) information, including your mobile number, name, address, email, network status, customer type, customer role, billing type, mobile device identifiers (IMSI and IMEI) and other subscriber status details, if available, solely to allow verification of your identity and to compare information you have provided to the Licensor with your wireless operator account profile information for the duration of the business relationship. 
                  </Text>
                  
                </Text>
              </ScrollView>
            </ScrollView>

            <View style={styles.buttonsRow}>
              <Pressable
                style={[styles.actionButton, styles.declineButton]}
                onPress={() => { }}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </Pressable>

              <Pressable
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => { setModalVisible(false); }}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    // ...StyleSheet.absoluteFill,
    width: '100%',
    height: '108%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    // backgroundColor: 'rgba(255,255,255,0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: 100,
    marginTop: 20,
  },
  buttonGroup: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    minHeight: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  primaryButton: {
    backgroundColor: '#0B2C6E',
  },
  secondaryButton: {
    backgroundColor: '#0B2C6E',
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  linkText: {
    color: '#2265BC',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '95%',
    maxHeight: '90%',
    backgroundColor: '#282828',
    borderRadius: 0,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4BB0D5',
    // marginBottom: 15,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerTitle:{
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'left',
  },

  modalText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#ffffff',
  },

  modalButton: {
    marginTop: 20,
    backgroundColor: '#0B2C6E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  modalSubTitle: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 20,
    fontWeight: '700',
  },

  sectionTitle: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 17,
  },

  boldText: {
    fontWeight: '700',
  },
  buttonsRow: {
    flexDirection: 'row',
    // marginTop: 25,
  },

  actionButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5c5b5b',

  },

  declineButton: {
    backgroundColor: '#282828',
  },

  acceptButton: {
    backgroundColor: '#282828',
  },

  declineButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },

  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4BB0D5',
  },

  infoImage: {
    width: 20,
    height: 20,
    // marginRight: 10,
    // marginBottom: -13,
  },
});

export default App;
