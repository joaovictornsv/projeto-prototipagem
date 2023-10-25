import {View, Text, Button, ScrollView, TextInput as Input} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {getLicensePlateInfo, verifyInvoiceNumber} from "../../../utils/api";

export default function CreateScreen({ navigation }) {
  const { control, setValue } = useForm();

  const onVerifyLicensePlate = () => {
    getLicensePlateInfo()
      .then((data) => {
        setValue('vehicle_model', data.model)
        setValue('vehicle_year', data.year)
      })
      .catch((e) => console.error(e))
  }

  const onVerifyInvoiceNumber = () => {
    verifyInvoiceNumber()
      .then((data) => {
        setValue('load_weigh', data.loadWeight)
        setValue('company_name', data.company)
      })
      .catch((e) => console.error(e))
  }
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
                <Button title="Verificar" style={{ flexGrow: 1, backgroundColor: '#7286D3'}} onPress={onVerifyLicensePlate}/>
              </View>
              <View style={{ flex: 1, flexDirection:'row', gap: 4}}>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Modelo do veículo"
                      isReadOnly={true}
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
                      isReadOnly={true}
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
                <Button title="Verificar" style={{ flexGrow: 1, backgroundColor: '#7286D3'}} onPress={onVerifyInvoiceNumber} />
              </View>

              <View style={{ flex: 1, flexDirection:'row', gap: 4}}>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Pesagem"
                      onBlur={field.onBlur}
                      isReadOnly={true}
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
                      isReadOnly={true}
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
          <Button title="Salvar" width='100%' style={{backgroundColor: '#7286D3'}} />
          <Button title="Voltar" onPress={() => navigation.navigate('Access')} width='100%' style={{backgroundColor: '#0C0F14', marginTop: 24}} />
        </ScrollView>

      </View>
    </View>

  );
}
