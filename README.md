# GoAutoService

Această aplicație dorește să conecteze proprietarii de autovehicule cu service-urile auto din împrejurimi.

Principala funcționalitate este că un client poate crea o cerere de preț iar service-urile din jur pot estima un preț pentru lucrare. Din ofertele primite de la ateliere, alegând un interval orar din programul service-ului clientul se pot programa singuri pentru a repara mașina.

Pentru front-end-ul aplicației am folosit React Native iar pentru partea de back-end, pentru stocarea datelor am folosit Firebase Firestore, pentru stocarea imaginilor m-am folosit de Firebase Storage iar pentru autentificare și creare conturilor am utilizat Firebase Authentication.

Acesta este Repository-ul aplicației pentru clienți. 
Repository-ul aplicației pentru service-urile auto împreună cu prezentarea acesteia: https://github.com/PetroviciMihail/ServiceSide

Link-ul de unde poate fi descarcată aplicația pentru clienți: https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40petrovicivasile/GoAutoService-c0af57a54eb240558ad4184c1f943017-signed.apk
Link-ul de unde poate fi descarcată aplicația pentru service-uri auto: https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40petrovicivasile/ServiceSide-9e4c31d2f75f41e182d9a2a830e0c808-signed.apk

Prezentarea Ecranelor și a funcționalitățiilor aplicației pentru clienți

Ecranul de înregistrare și creare a unui cont nou
Contul este creat prin Authentication, și validarea autenficării la fel. Validarea campurilor se face folosing formik si yup.
![image](https://user-images.githubusercontent.com/61497362/190011546-5248c95b-9851-46d0-9faa-17deb99ec6c7.png)

Folosind un BottomTabNavigator din @react-navigation/bottom-tabs in partea de jos sunt disponibile 4 ecrane la intrarea în aplicație.

Primul pas pentru a putea folosi aplicația este adăugarea unui vehicul.
Mașinile adăugate apar pe ecranul "My Cars", de aici apăsând pe una din mașini putem vedea detali despre acestea.
![image](https://user-images.githubusercontent.com/61497362/190013548-f0e110d9-943e-45b2-bb72-e6ef95d95224.png)

Pentru fiecare mașina putem vedea și istoricul lucrarilor si câteva statistici.
![image](https://user-images.githubusercontent.com/61497362/190013675-a91ee0ae-755f-4fed-8898-bce41daca13d.png)

Pentru crearea unei cereri noi de preț putem face astea de pe ecranul "My requests". Dupa crearea acestora, ele vor fi afișate într-o listă de unde putem afla care dintre ele au primit oferte și printr-un swipe stânga le putem sterge.
![image](https://user-images.githubusercontent.com/61497362/190015494-d0e0bdf5-d3dc-49c4-8bb5-e19b0612cc38.png)

Obținerea locației se face fie prin oferirea accesului aplicației la locația dispozitivului, fie prin initializarea pinului în centrul Bucureștiului, de unde utilizatorul îl poate muta manual.

const [coordsX, setCoordsX] = useState(26.10401); //longitude
const [coordsY, setCoordsY] = useState(44.42946); //latitude
  
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (!status) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync({});

    setCoordsX(longitude);
    setCoordsY(latitude);
  };


O dată cu vizualizarea detaliilor unei cereri de preț putem vedea si ofertele și alegând una vedem detaliile despre service și putem alege un interval orar și o dată pentru a realiza o programare.
![image](https://user-images.githubusercontent.com/61497362/190016111-b6db2fd2-ea4c-4927-8123-4ed5b0d00863.png)

Programările pot fi vizualizate pe ecranul "Appointments". De aici putem anula o rezervare, fapt ce face cererea de preț vizibila pentru alte service-uri pentru a oferta.
![image](https://user-images.githubusercontent.com/61497362/190016532-f011d2b4-6105-433a-9e5d-1fa0845673f8.png)

După confirmarea lucrării de catre service-ul auto intrarea va apărea in istoricul vehiculului, de unde clientul poate oferi și o evaluare service-ului.
Pe ecranul "My account" clientul își poate modifica câteva date despre cont și se poate deconecta.


