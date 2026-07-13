import React, { ReactNode, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Pressable,
  Text as RNText,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AccordionItem from '../components/AccordionItem';

type AppTextProps = React.ComponentProps<typeof RNText>;
function AppText(props: AppTextProps) {
  const { style, ...rest } = props;
  return <RNText {...rest} style={[{ fontFamily: 'OpenSans-Regular' }, style]} />;
}
const Text = AppText;

interface LoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLogin }) => {
  const insets = useSafeAreaInsets();
  const [saveUserId, setSaveUserId] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoArea}>
          <Image source={require('../../assets/images/Bank_of_America_logo_2.png')} style={styles.logo} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>User ID</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="" />

          <View style={styles.checkboxRow}>
            <Pressable
              style={styles.checkboxButton}
              onPress={() => setSaveUserId((v) => !v)}
            >
              <View style={[styles.checkbox, saveUserId && styles.checkboxChecked]}>
                {saveUserId ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={styles.checkboxText}>Save User ID</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxButton}
              onPress={() => setUseBiometrics((v) => !v)}
            >
              <View style={[styles.checkbox, useBiometrics && styles.checkboxChecked]}>
                {useBiometrics ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={styles.checkboxText}>Set up Biometrics</Text>
            </Pressable>
          </View>

          <Pressable style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </Pressable>

          <View style={styles.linksRow}>
            <Text style={styles.link}>Forgot user ID/password</Text>
            <View style={{ width: 24 }} />
            <Text style={styles.link}>Enroll</Text>
          </View>
        </View>

        <View style={styles.linksRowBottom}>
            <Text style={styles.link}>Locations</Text>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.link}>Contact Us</Text>
        </View>

        <View>
            <Text style={styles.infoTitle}>Bank of America deposit products:</Text>
            <View style={styles.infoRow}>
                <Image source={require('../../assets/images/channels4_profile.png')} style={{ width: 40, height: 17 }} />
                <Text style={styles.infoText}>FDIC-Insured - Backed by the full faith and credit of the U.S. Government</Text>
            </View>
        </View>

        <View style={styles.imageCardGrid}>
          <View style={styles.tile}><Image source={require('../../assets/images/box.1.jpg')} style={{ width: '100%', height: '100%' }} /></View>
            <View style={styles.tile}><Image source={require('../../assets/images/box.2.jpg')} style={{ width: '100%', height: '100%' }} /></View>
            <View style={styles.tile}><Image source={require('../../assets/images/box.3.jpg')} style={{ width: '100%', height: '100%' }} /></View>
            <View style={styles.tile}><Image source={require('../../assets/images/box.4.jpg')} style={{ width: '100%', height: '100%' }} /></View>
        </View>

        <View style={{borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 0, marginTop: 20}}>
        <AccordionItem title="Image Text">
            <Text style={styles.listLinkText}>Choose the card that works for you</Text>
            <Text style={styles.listLinkText}>Open a Savings account</Text>
            <Text style={styles.listLinkText}>Zelle® Get money sent straight to your account</Text>
            <Text style={styles.listLinkText}>Open an Account</Text>
        </AccordionItem>
        </View>

        <View style={styles.linksRowBottom}>
            <Text style={styles.link}>My Balance ®</Text>
        </View>

        <View style={styles.footerInfo}>
            <Text style={styles.footerInfoTitle}>Learn more about Merrill's background on <Text style={styles.footerInfoText}>FINRA's BrokerCheck</Text>.</Text>
        </View>
        
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  logoArea: { alignItems: 'center', marginTop: 10, marginBottom: 0},
  logo: { width: '70%', height: 100 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 6 }, shadowRadius: 10, elevation: 4 },
  label: { fontSize: 14, color: '#222', marginBottom: 8 },
  input: { height: 44, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingHorizontal: 8 },
  checkboxRow: { flexDirection: 'row', marginTop: 18, justifyContent: 'space-between' },
  checkboxButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  checkbox: { width: 18, height: 18, borderWidth: 2, borderColor: '#0c5dae', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#0c5dae' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkboxText: { marginLeft: 8, color: '#0c5dae', fontSize: 13, fontWeight: '700' },
  loginButton: { backgroundColor: '#0B2C6E', paddingVertical: 4, marginTop: 18, borderRadius: 0, alignItems: 'center', width: 75, alignSelf: 'center' },
  loginButtonText: { color: '#fff', fontWeight: '700', letterSpacing: 1.2, fontSize: 13 },
  linksRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, paddingHorizontal: 6 },
  linksRowBottom: { flexDirection: 'row', justifyContent: 'center', marginTop: 40, marginBottom: 0, paddingHorizontal: 6 },
  link: { color: '#2265BC', fontSize: 13, fontWeight: '700', textDecorationLine: 'none' },
    divider: { color: '#2265BC', marginHorizontal: 6 },
    infoTitle: { fontWeight: '500', marginTop: 20, marginBottom: 6, fontSize: 15, color: '#444444', fontStyle: 'italic' },   
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    infoText: { marginLeft: 8, fontSize: 10, fontStyle: 'italic', color: '#666' },
  imageCardGrid: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 3, },
  tile: { width: '48%', height: 100, borderWidth: 1, borderColor: '#666666', borderRadius: 8, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  footer: { marginTop: 8 },
  footerInfo: { marginTop: 20, marginBottom: 20,  },
  footerInfoTitle: { fontWeight: '700', marginBottom: 6, fontSize: 12, color: '#5c5c5c', textAlign: 'center' },
  footerInfoText: { color: '#0c5dae' },
  listLinkText: {
        fontSize: 12,
        color: '#0c5dae',
        fontWeight: '700',
        marginBottom: 25,
    }
});

export default LoginScreen;
