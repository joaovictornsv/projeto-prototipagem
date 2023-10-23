import {View, Text} from 'react-native';
import { Button, Input, ScrollView, } from 'native-base';
import {Controller, useForm} from 'react-hook-form';

export default function CreateScreen({ navigation }) {
  const { control } = useForm();

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%', backgroundColor: '#F9F9F9' }}>
            <View style={{width: '80%', marginTop: 100, marginBottom: 70}}>
                <Text style={{fontWeight: 'bold', fontSize: 36, color: '#0C0F14', marginBottom: 30, textAlign: "center" }} >Nova pesagem</Text>
                <ScrollView height='100%'>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                placeholder="Nome"
                                onBlur={field.onBlur}
                                onChangeText={(data) => field.onChange(data)}
                                value={field.value}
                                variant="unstyled"
                                size="lg"
                                w="100%"
                                style={ {
                                    backgroundColor: '#E5E0FF',
                                    color: '#0C0F14',
                                    height: 55,
                                    borderRadius: 4,
                                    marginTop: 5,
                                }}
                            />
                        )}
                        name="user_name"
                        defaultValue=""
                    />

                    <View style={{marginTop: 8 , flexDirection:"column", gap: 16, justifyContent: 'space-between', alignItems: 'center',width: '100%'}}>
                        <Button width='100%' style={{backgroundColor: '#7286D3'}} >
                            <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Cadastrar</Text>
                        </Button>
                    </View>
                    <Button onPress={() => navigation.navigate('Access')} width='100%' style={{backgroundColor: '#0C0F14', marginTop: 24}} >
                        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Voltar</Text>
                    </Button>
                </ScrollView>

            </View>
        </View>

    );
}
