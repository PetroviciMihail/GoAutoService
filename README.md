# GoAutoService

Această aplicație dorește să conecteze proprietarii de autovehicule cu service-urile auto din împrejurimi.

Principala funcționalitate este că un client poate crea o cerere de preț iar service-urile din jur pot estima un preț pentru lucrare. Din ofertele primite de la ateliere, alegând un interval orar din programul service-ului clientul se pot programa singuri pentru a repara mașina.

Pentru front-end-ul aplicației am folosit React Native și ca instrument de dezvoltare am folosit Expo. Aplicația este testată deocamdată doar pentru dispozitive Android.

Pentru partea de back-end am folosit Firebase (Authentication, Firestore și Storage).

Acesta este Repository-ul aplicației pentru clienți. 
Repository-ul aplicației pentru service-urile auto împreună cu prezentarea acesteia: https://github.com/PetroviciMihail/ServiceSide

Link-ul de unde poate fi descarcată aplicația pentru clienți: https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40petrovicivasile/GoAutoService-e2f8985ddb18470282658b849d0af6f1-signed.apk

Link-ul de unde poate fi descarcată aplicația pentru service-uri auto: https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40petrovicivasile/ServiceSide-40251ad5e1254286819273ce9d1a9041-signed.apk

Prezentarea Ecranelor și a funcționalitățiilor aplicației pentru clienți:

--- Ecranul de înregistrare și creare a unui cont nou

Contul este creat cu ajutorul Authentication, și verificarea autenficării la fel. Validarea campurilor se face folosing formik si yup.

![image](https://user-images.githubusercontent.com/61497362/190011546-5248c95b-9851-46d0-9faa-17deb99ec6c7.png)

Folosind un BottomTabNavigator din @react-navigation/bottom-tabs in partea de jos sunt disponibile 4 ecrane la intrarea în aplicație.

--- Primul pas pentru a putea folosi aplicația este adăugarea unui vehicul.
Mașinile adăugate apar pe ecranul "My Cars". Aici apăsând pe una din mașinile din listă putem vedea detali despre acestea.

![image](https://user-images.githubusercontent.com/61497362/190013548-f0e110d9-943e-45b2-bb72-e6ef95d95224.png)

Pentru fiecare mașina putem vedea și istoricul lucrarilor si câteva statistici.

![image](https://user-images.githubusercontent.com/61497362/190094717-fcdcf5d0-7144-43ed-bf0f-7ed247d8ebcd.png)


--- Crearea unei cereri noi de preț o putem face de pe ecranul "My requests". Dupa crearea acestora, ele vor fi afișate într-o listă de unde putem afla care dintre ele au primit oferte și printr-un swipe stânga le putem și șterge.

![image](https://user-images.githubusercontent.com/61497362/190015494-d0e0bdf5-d3dc-49c4-8bb5-e19b0612cc38.png)

Schema de validare Yup și formul de creare a unei cereri:

```
const validationSchema = Yup.object().shape({
  car: Yup.object().nullable().required().label("Car"),
  description: Yup.string().label("Description"),
  category: Yup.string().required().label("Category"),
  images: Yup.array(),
});

<AppForm
        initialValues={{
          category: "",
          car: null,
          images: [],
          description: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppPicker
          items={categories}
          name="category"
          PickerItemComponent={PickerItem}
          placeholder="Category"
          width="70%"
        />
        <CarPicker
          items={cars}
          name="car"
          PickerItemComponent={PickerItem}
          placeholder="Select a car"
          width="70%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />

        <SubmitButton title="Create" backgroundcolor="secondary" />
      </AppForm>
 ```

Obținerea locației se face fie prin oferirea accesului aplicației la locația dispozitivului, fie prin initializarea pinului în centrul Bucureștiului, de unde utilizatorul îl poate muta manual.
```
  import * as Location from "expo-location";

  const [coordsX, setCoordsX] = useState(26.10401); //longitude
  const [coordsY, setCoordsY] = useState(44.42946); //latitude
  
    useEffect(() => {
    getDataFromDatabase();
    getLocation();
  }, []);
  
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (!status) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync({});

    setCoordsX(longitude);
    setCoordsY(latitude);
  };
```

Afișarea MapView-ului cu Makerul inițializat anterior

Pentru folosirea acestora am obținut si o cheie a API-ului pentru Google Maps pe care am adăugat-o în AndroidManifest.xml 
```
<MapView
        style={styles.map}
        initialRegion={{
          latitude: coordsY,
          longitude: coordsX,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={{ latitude: coordsY, longitude: coordsX }}
          onDragEnd={(e) => {
            setCoordsX(parseFloat(e.nativeEvent.coordinate.longitude));
            setCoordsY(parseFloat(e.nativeEvent.coordinate.latitude));
          }}
        />
      </MapView>
```

O dată cu vizualizarea detaliilor unei cereri de preț putem vedea si ofertele.

Alegând o ofertă utilizatorul vede detaliile despre service de unde poate alege o dată și o oră pentru a realiza o programare. Odată realizată programarea cerea de oferă nu va mai fi diponibilă pentru a mai primi oferte.

![image](https://user-images.githubusercontent.com/61497362/190016111-b6db2fd2-ea4c-4927-8123-4ed5b0d00863.png)

Programările pot fi vizualizate pe ecranul "Appointments". De aici putem anula o rezervare, fapt ce face cererea de preț vizibila pentru alte service-uri pentru a oferta în continuare.

![image](https://user-images.githubusercontent.com/61497362/190016532-f011d2b4-6105-433a-9e5d-1fa0845673f8.png)

După confirmarea lucrării de catre service-ul auto (din aplicația prezentată în https://github.com/PetroviciMihail/ServiceSide) intrarea va apărea în istoricul vehiculului, de unde clientul poate oferi și o evaluare service-ului.

Pe ecranul "My account" clientul își poate modifica câteva date despre cont și se poate deconecta.

![image](https://user-images.githubusercontent.com/61497362/190021601-3c9871ad-9269-42ee-91a1-09215b05f69b.png)

