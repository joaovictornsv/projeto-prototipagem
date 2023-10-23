import {Text, View} from 'react-native';
import { styles } from './styles'
import {Button} from "native-base";

export default function RecentAccessScreen({ navigation }) {


    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>Acessos recentes</Text>
                <Text>Carregando...</Text>
                <Button onPress={() => navigation.navigate('Create')} padding="3" style={{backgroundColor: '#0C0F14', marginTop: 24}} >
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>Criar usuário</Text>
                </Button>
            </View>
        </View>
    )
}
