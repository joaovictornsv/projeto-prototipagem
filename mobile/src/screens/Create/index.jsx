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
                  <View style={{ flex: 1, flexDirection: 'column', gap: 16 }}>
                    <View style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                    <Text style={{fontWeight: 'bold', fontSize: 24, color: '#0C0F14', textAlign: "left" }} >
                      Motorista
                    </Text>
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
                      name="driver_name"
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="CPF"
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
                      name="driver_document"
                      defaultValue=""
                    />
                  </View>
                    <View style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                      <Text style={{fontWeight: 'bold', fontSize: 24, color: '#0C0F14', textAlign: "left" }} >
                        Veículo
                      </Text>

                      <View style={{ flex: 1, alignItems:"center", flexDirection:'row', gap: 4}}>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Número da placa"
                              onBlur={field.onBlur}
                              onChangeText={(data) => field.onChange(data)}
                              value={field.value}
                              variant="unstyled"
                              size="lg"
                              w="70%"
                              style={ {
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="license_plate_number"
                          defaultValue=""
                        />
                        <Button style={{ flexGrow: 1, backgroundColor: '#7286D3'}} >
                          <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Verificar</Text>
                        </Button>
                      </View>
                      <View style={{ flex: 1, flexDirection:'row', gap: 4}}>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Modelo do veículo"
                              isDisabled={true}
                              value={field.value}
                              variant="unstyled"
                              w="50%"
                              size="lg"
                              style={{
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="vehicle_model"
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Ano do veículo"
                              onBlur={field.onBlur}
                              isDisabled={true}
                              value={field.value}
                              variant="unstyled"
                              w="50%"
                              size="lg"
                              style={ {
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="vehicle_year"
                          defaultValue=""
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                      <Text style={{fontWeight: 'bold', fontSize: 24, color: '#0C0F14', textAlign: "left" }} >
                        Nota Fiscal
                      </Text>

                      <View style={{ flex: 1, alignItems:"center", flexDirection:'row', gap: 4}}>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Código"
                              onBlur={field.onBlur}
                              onChangeText={(data) => field.onChange(data)}
                              value={field.value}
                              variant="unstyled"
                              size="lg"
                              w="70%"
                              style={ {
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="invoice_number"
                          defaultValue=""
                        />
                        <Button style={{ flexGrow: 1, backgroundColor: '#7286D3'}} >
                          <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Verificar</Text>
                        </Button>
                      </View>

                      <View style={{ flex: 1, flexDirection:'row', gap: 4}}>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Pesagem"
                              onBlur={field.onBlur}
                              isDisabled={true}
                              value={field.value}
                              variant="unstyled"
                              w="50%"
                              size="lg"
                              style={{
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="load_weigh"
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Emissor"
                              onBlur={field.onBlur}
                              isDisabled={true}
                              value={field.value}
                              variant="unstyled"
                              w="50%"
                              size="lg"
                              style={ {
                                backgroundColor: '#E5E0FF',
                                color: '#0C0F14',
                                height: 55,
                                borderRadius: 4,
                                marginTop: 5,
                              }}
                            />
                          )}
                          name="company_name"
                          defaultValue=""
                        />
                      </View>
                    </View>

                  </View>
                  <View style={{marginTop: 8 , flexDirection:"column", gap: 16, justifyContent: 'space-between', alignItems: 'center',width: '100%'}}>
                      <Button width='100%' style={{backgroundColor: '#7286D3'}} >
                          <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Salvar</Text>
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
