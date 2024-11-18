import { useState } from 'react';
import searchIcon from '../assets/search.svg'; // Assuming this is your search icon
import { Link } from 'react-router-dom';

const states = [
  'Abuja', 'Abia', 'Adamawa', 'Akwa-Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross-River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',  'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

const markets = {
    Abia: [
      { name: 'Ariaria International Market (Aba)', img: '/path/to/ariaria.png' },
      { name: 'Umuahia Main Market (Umuahia)', img: '/path/to/umuahia-main.png' },
      { name: 'Ubakala Market (Ubakala)', img: '/path/to/ubakala.png' },
      { name: 'Aba International Market (Aba)', img: '/path/to/aba-international.png' },
      { name: 'Ohia Market (Ohia)', img: '/path/to/ohia.png' },
      { name: 'Osisioma Market (Osisioma)', img: '/path/to/osisioma.png' },
      { name: 'Omoba Market (Omoba)', img: '/path/to/omoba.png' },
      { name: 'Isiala Oboro Market (Isiala Oboro)', img: '/path/to/isiala-oboro.png' },
      { name: 'Umuike Market (Umuike)', img: '/path/to/umuike.png' },
      { name: 'Akwa Ibom Market (Aba)', img: '/path/to/akwa-ibom.png' },
      { name: 'Eziukwu Market (Aba)', img: '/path/to/eziukwu.png' },
      { name: 'Ogbuka Market (Umuahia)', img: '/path/to/ogbuka.png' },
      { name: 'Olokoro Market (Olokoro)', img: '/path/to/olokoro.png' },
      { name: 'Ikwuano Market (Ikwuano)', img: '/path/to/ikwuano.png' },
      { name: 'Okeikpe Market (Okeikpe)', img: '/path/to/okeikpe.png' },
      { name: 'Uzuakoli Market (Uzuakoli)', img: '/path/to/uzuakoli.png' },
      { name: 'Alaoji Market (Alaoji)', img: '/path/to/alaoji.png' },
      { name: 'Obikabia Market (Obikabia)', img: '/path/to/obikabia.png' },
      { name: 'Umuocham Market (Umuocham)', img: '/path/to/umuocham.png' },
      { name: 'Nkwoegwu Market (Nkwoegwu)', img: '/path/to/nkwoegwu.png' },
      { name: 'Umuosu Market (Umuosu)', img: '/path/to/umuosu.png' },
      { name: 'Oriendu Market (Oriendu)', img: '/path/to/oriendu.png' },
      { name: 'Ndiegoro Market (Ndiegoro)', img: '/path/to/ndiegoro.png' },
    ],

    'Akwa-Ibom': [
      { name: 'Abak Main Market', img: '/path/to/abak.png' },
      { name: 'Akwa Ibom Plaza', img: '/path/to/akwa-ibom-plaza.png' },
      { name: 'Eket Fish Market', img: '/path/to/eket-fish.png' },
      { name: 'Eket Main Market', img: '/path/to/eket-main.png' },
      { name: 'Ewet Housing Estate Market', img: '/path/to/ewet-housing.png' },
      { name: 'Ikot Ekpene Fabric Market', img: '/path/to/ikot-ekpene-fabric.png' },
      { name: 'Ikot Ekpene Main Market (Mbut Obio)', img: '/path/to/ikot-ekpene-main.png' },
      { name: 'Itam Market', img: '/path/to/itam.png' },
      { name: 'Oron Fish Market', img: '/path/to/oron-fish.png' },
      { name: 'Oron Main Market', img: '/path/to/oron-main.png' },
      { name: 'Uyo Main Market (Uyo Central Market)', img: '/path/to/uyo-main.png' },
      { name: 'Urua Ekpa Market', img: '/path/to/urua-ekpa.png' },
      { name: 'Urua Nsit Market', img: '/path/to/urua-nsit.png' },
      { name: 'Urua Akpan Ete Market', img: '/path/to/urua-akpan-ete.png' },
      { name: 'Urua Abak Market', img: '/path/to/urua-abak.png' },
      { name: 'Ikot Ibritam Market', img: '/path/to/ikot-ibritam.png' },
      { name: 'Ikot Abasi Main Market', img: '/path/to/ikot-abasi-main.png' },
      { name: 'Urua Ikot Abasi Market', img: '/path/to/urua-ikot-abasi.png' },
      { name: 'Etim Ekpo Market', img: '/path/to/etim-ekpo.png' },
      { name: 'Ikono Main Market', img: '/path/to/ikono-main.png' },
      { name: 'Urua Ikono Market', img: '/path/to/urua-ikono.png' },
      { name: 'Nto Edino Market', img: '/path/to/nto-edino.png' },
      { name: 'Etinan Main Market', img: '/path/to/etinan-main.png' },
      { name: 'Urua Etinan Market', img: '/path/to/urua-etinan.png' },
      { name: 'Ikot Akpan Market', img: '/path/to/ikot-akpan.png' },
    ],

    Anambra: [
      { name: 'Afor Aguleri Market', img: '/path/to/afor-aguleri.png' },
      { name: 'Afor Igwe Market', img: '/path/to/afor-igwe.png' },
      { name: 'Amaenyi Market', img: '/path/to/amaenyi.png' },
      { name: 'Bridgehead Market', img: '/path/to/bridgehead.png' },
      { name: 'Eke Amaobi Market', img: '/path/to/eke-amaobi.png' },
      { name: 'Eke Awka Market', img: '/path/to/eke-awka.png' },
      { name: 'Eke Ekwulobia Market', img: '/path/to/eke-ekwulobia.png' },
      { name: 'Eke Market (Aguleri)', img: '/path/to/eke-aguleri.png' },
      { name: 'Electronics Market', img: '/path/to/electronics-market.png' },
      { name: 'Nkwo Ekwulobia Market', img: '/path/to/nkwo-ekwulobia.png' },
      { name: 'Nkwo Nnewi Market', img: '/path/to/nkwo-nnewi.png' },
      { name: 'Nkwo Ogbe Market', img: '/path/to/nkwo-ogbe.png' },
      { name: 'Nkwelle Market', img: '/path/to/nkwelle.png' },
      { name: 'Nnewi Spare Parts Market', img: '/path/to/nnewi-spare-parts.png' },
      { name: 'Ochanja Market', img: '/path/to/ochanja.png' },
      { name: 'Onitsha Main Market', img: '/path/to/onitsha-main.png' },
      { name: 'Relief Market', img: '/path/to/relief.png' },
      { name: 'Uru Market', img: '/path/to/uru.png' },
    ],
    Bauchi: [
      { name: 'Alkaleri Central Market', img: '/path/to/alkaleri-central.png' },
      { name: 'Badara Market', img: '/path/to/badara.png' },
      { name: 'Bagel Market', img: '/path/to/bagel.png' },
      { name: 'Bakin Kura Market', img: '/path/to/bakin-kura.png' },
      { name: 'Bogoro Market', img: '/path/to/bogoro.png' },
      { name: 'Central Market Bauchi', img: '/path/to/central-bauchi.png' },
      { name: 'Dagu Market', img: '/path/to/dagu.png' },
      { name: 'Dass Central Market', img: '/path/to/dass-central.png' },
      { name: 'Darazo Market', img: '/path/to/darazo.png' },
      { name: 'Ganjuwa Market', img: '/path/to/ganjuwa.png' },
      { name: 'Goron Dutse Market', img: '/path/to/goron-dutse.png' },
      { name: 'Hawul Market', img: '/path/to/hawul.png' },
      { name: 'Jama’a Market', img: '/path/to/jamaa.png' },
      { name: 'Kafin Baka Market', img: '/path/to/kafin-baka.png' },
      { name: 'Kafin Madaki Market', img: '/path/to/kafin-madaki.png' },
      { name: 'Kafin Zaki Market', img: '/path/to/kafin-zaki.png' },
      { name: 'Kari Market', img: '/path/to/kari.png' },
      { name: 'Kirfi Market', img: '/path/to/kirfi.png' },
      { name: 'Kiyawa Market', img: '/path/to/kiyawa.png' },
      { name: 'Lere Market', img: '/path/to/lere.png' },
      { name: 'Lusa Market', img: '/path/to/lusa.png' },
      { name: 'Magama Gumau Market', img: '/path/to/magama-gumau.png' },
      { name: 'Misau Main Market', img: '/path/to/misau-main.png' },
      { name: 'Muda Lawal Market', img: '/path/to/muda-lawal.png' },
      { name: 'Ningi Main Market', img: '/path/to/ningi-main.png' },
      { name: 'Railway Market', img: '/path/to/railway.png' },
      { name: 'Sabon Kaura Market', img: '/path/to/sabon-kaura.png' },
      { name: 'Sade Market', img: '/path/to/sade.png' },
      { name: 'Soro Market', img: '/path/to/soro.png' },
      { name: 'Tafawa Balewa Main Market', img: '/path/to/tafawa-balewa-main.png' },
      { name: 'Tafawa Balewa Market', img: '/path/to/tafawa-balewa.png' },
      { name: 'Toro Market', img: '/path/to/toro.png' },
      { name: 'Warji Market', img: '/path/to/warji.png' },
      { name: 'Wanka Market', img: '/path/to/wanka.png' },
      { name: 'Wunti Market', img: '/path/to/wunti.png' },
      { name: 'Yelwa Market', img: '/path/to/yelwa.png' },
      { name: 'Yuli Market', img: '/path/to/yuli.png' },
      { name: 'Zindi Market', img: '/path/to/zindi.png' }
    ],

    Bayelsa: [
      { name: 'Akassa Fish Market', img: '/path/to/akassa-fish.png' },
      { name: 'Aleibiri Market', img: '/path/to/aleibiri.png' },
      { name: 'Amabulou Market', img: '/path/to/amabulou.png' },
      { name: 'Amassoma Market', img: '/path/to/amassoma.png' },
      { name: 'Anyama-Ogbia Market', img: '/path/to/anyama-ogbia.png' },
      { name: 'Brass Market', img: '/path/to/brass.png' },
      { name: 'Darazo Market', img: '/path/to/darazo.png' },
      { name: 'Egwema Local Market', img: '/path/to/egwema-local.png' },
      { name: 'Ekeremor Main Market', img: '/path/to/ekeremor-main.png' },
      { name: 'Ekeki Market', img: '/path/to/ekeki.png' },
      { name: 'Kolo Market', img: '/path/to/kolo.png' },
      { name: 'Koluama Market', img: '/path/to/koluama.png' },
      { name: 'Lobia Market', img: '/path/to/lobia.png' },
      { name: 'Nembe-Bassey Market', img: '/path/to/nembe-bassey.png' },
      { name: 'Nembe Main Market', img: '/path/to/nembe-main.png' },
      { name: 'Ogboinbiri Market', img: '/path/to/ogboinbiri.png' },
      { name: 'Odioma Market', img: '/path/to/odioma.png' },
      { name: 'Odi-Gbene Market', img: '/path/to/odi-gbene.png' },
      { name: 'Ogbia Town Market', img: '/path/to/ogbia-town.png' },
      { name: 'Oporoma Market', img: '/path/to/oporoma.png' },
      { name: 'Opolo Market', img: '/path/to/opolo.png' },
      { name: 'Ofoni Market', img: '/path/to/ofoni.png' },
      { name: 'Opu-Nembe Market', img: '/path/to/opu-nembe.png' },
      { name: 'Peretoru Local Market', img: '/path/to/peretoru-local.png' },
      { name: 'Sagbama Market', img: '/path/to/sagbama.png' },
      { name: 'Tombia Market', img: '/path/to/tombia.png' },
      { name: 'Toru-Orua Market', img: '/path/to/toru-orua.png' },
      { name: 'Twon Brass Market', img: '/path/to/twon-brass.png' },
      { name: 'Yelwa Market', img: '/path/to/yelwa.png' },
    ],

    Benue: [
      { name: 'Akaajime Market', img: '/path/to/akaajime.png' },
      { name: 'Enugu Road Market', img: '/path/to/enugu-road.png' },
      { name: 'Gboko Main Market', img: '/path/to/gboko-main.png' },
      { name: 'Gboko North Market', img: '/path/to/gboko-north.png' },
      { name: 'Gboko South Market', img: '/path/to/gboko-south.png' },
      { name: 'GRA Market', img: '/path/to/gra.png' },
      { name: 'Katsina-Ala Market', img: '/path/to/katsina-ala.png' },
      { name: 'Makurdi Main Market', img: '/path/to/makurdi-main.png' },
      { name: 'Makurdi Modern Market', img: '/path/to/makurdi-modern.png' },
      { name: 'Mbalagh Market', img: '/path/to/mbalagh.png' },
      { name: 'Naka Road Market', img: '/path/to/naka-road.png' },
      { name: 'North Bank Market', img: '/path/to/north-bank.png' },
      { name: 'Ugbokolo Market', img: '/path/to/ugbokolo.png' },
      { name: 'Wurukum Market', img: '/path/to/wurukum.png' },
    ],

    Borno: [
      { name: 'Baga Market', img: '/path/to/baga.png' },
      { name: 'Bama Central Market', img: '/path/to/bama-central.png' },
      { name: 'Bama Fish Market', img: '/path/to/bama-fish.png' },
      { name: 'Bama Main Market', img: '/path/to/bama-main.png' },
      { name: 'Bama Sunday Market', img: '/path/to/bama-sunday.png' },
      { name: 'Biu Central Market', img: '/path/to/biu-central.png' },
      { name: 'Biu Friday Market', img: '/path/to/biu-friday.png' },
      { name: 'Biu Main Market', img: '/path/to/biu-main.png' },
      { name: 'Biu Motor Park Market', img: '/path/to/biu-motor-park.png' },
      { name: 'Customs Market', img: '/path/to/customs.png' },
      { name: 'Gamboru Market', img: '/path/to/gamboru.png' },
      { name: 'Kadamari Market', img: '/path/to/kadamari.png' },
      { name: 'Kwanan Gashu\'a Market', img: '/path/to/kwanan-gashua.png' },
      { name: 'Kwaya Kusar Market', img: '/path/to/kwaya-kusar.png' },
      { name: 'Maiduguri Main Market (Bama Road Market)', img: '/path/to/maiduguri-main.png' },
      { name: 'Ngamdu Market', img: '/path/to/ngamdu.png' },
      { name: 'Old Maiduguri Market', img: '/path/to/old-maiduguri.png' },
      { name: 'Wulgo Market', img: '/path/to/wulgo.png' },
    ],

    CrossRiver: [
      { name: 'Akamkpa Main Market', img: '/path/to/akamkpa-main.png' },
      { name: 'Akamkpa Timber Market', img: '/path/to/akamkpa-timber.png' },
      { name: 'Akpabuyo Main Market', img: '/path/to/akpabuyo-main.png' },
      { name: 'Bendeghe Ekiem Market', img: '/path/to/bendeghe-ekiem.png' },
      { name: 'Bekwarra Market', img: '/path/to/bekwarra.png' },
      { name: 'Biase Main Market', img: '/path/to/biase-main.png' },
      { name: 'Biase Town Market', img: '/path/to/biase-town.png' },
      { name: 'Boki Agricultural Market', img: '/path/to/boki-agricultural.png' },
      { name: 'Boki Main Market', img: '/path/to/boki-main.png' },
      { name: 'Danare Market', img: '/path/to/danare.png' },
      { name: 'Ediba Market', img: '/path/to/ediba.png' },
      { name: 'Etomi Market', img: '/path/to/etomi.png' },
      { name: 'Igede Market', img: '/path/to/igede.png' },
      { name: 'Igede Weekly Market', img: '/path/to/igede-weekly.png' },
      { name: 'Ikom Cattle Market', img: '/path/to/ikom-cattle.png' },
      { name: 'Ikom Main Market', img: '/path/to/ikom-main.png' },
      { name: 'Iso-bendghe Market', img: '/path/to/iso-bendghe.png' },
      { name: 'Itigidi Market', img: '/path/to/itigidi.png' },
      { name: 'Marian Market', img: '/path/to/marian.png' },
      { name: 'Obanliku Market', img: '/path/to/obanliku.png' },
      { name: 'Obudu Cattle Market', img: '/path/to/obudu-cattle.png' },
      { name: 'Obudu Main Market', img: '/path/to/obudu-main.png' },
      { name: 'Obubra Main Market', img: '/path/to/obubra-main.png' },
      { name: 'Obubra Town Market', img: '/path/to/obubra-town.png' },
      { name: 'Odukpani Market', img: '/path/to/odukpani.png' },
      { name: 'Odukpani Timber Market', img: '/path/to/odukpani-timber.png' },
      { name: 'Ogoja Cattle Market', img: '/path/to/ogoja-cattle.png' },
      { name: 'Ogoja Main Market', img: '/path/to/ogoja-main.png' },
      { name: 'Ofutop Market', img: '/path/to/ofutop.png' },
      { name: 'Ugep Cattle Market', img: '/path/to/ugep-cattle.png' },
      { name: 'Ugep Main Market', img: '/path/to/ugep-main.png' },
      { name: 'Ukpe Market', img: '/path/to/ukpe.png' },
      { name: 'Ukelle Market', img: '/path/to/ukelle.png' },
      { name: 'Worji Market', img: '/path/to/worji.png' },
      { name: 'Yala Market', img: '/path/to/yala.png' }
    ],
    
    Lagos: [
      { name: 'Agbalata Market Badagry', img: '/path/to/agbalata.png' },
      { name: 'Alaba International Market', img: '/path/to/alaba-international.png' },
      { name: 'Ajah Market', img: '/path/to/ajah-market.png' },
      { name: 'Aratumi Market', img: '/path/to/aratumi-market.png' },
      { name: 'Balogun Market, Lagos Island', img: '/path/to/balogun.png' },
      { name: 'Bar Beach Market', img: '/path/to/bar-beach-market.png' },
      { name: 'Computer Village', img: '/path/to/computer-village.png' },
      { name: 'Èbúté Èrò Market, Lagos Island', img: '/path/to/ebutero-market.png' },
      { name: 'Epe Fish Market', img: '/path/to/epe-fish-market.png' },
      { name: 'Iyana-Iba Market', img: '/path/to/iyana-iba-market.png' },
      { name: 'Ikotun Market', img: '/path/to/ikotun-market.png' },
      { name: 'Idumota Market', img: '/path/to/idumota-market.png' },
      { name: 'Ita Faji Market', img: '/path/to/ita-faji-market.png' },
      { name: 'Isale Eko Market, Lagos Island', img: '/path/to/isale-eko-market.png' },
      { name: 'Jankarra Market, Lagos Island', img: '/path/to/jankarra-market.png' },
      { name: 'Ladipo Market', img: '/path/to/ladipo-market.png' },
      { name: 'Lekki Market', img: '/path/to/lekki-market.png' },
      { name: 'Agboju Market', img: '/path/to/agboju-market.png' },
      { name: 'Daleko Market', img: '/path/to/daleko-market.png' },
      { name: 'Morocco I and II markets', img: '/path/to/morocco-markets.png' },
      { name: 'Mushin Market', img: '/path/to/mushin-market.png' },
      { name: 'Oyingbo Market', img: '/path/to/oyingbo-market.png' },
      { name: 'Mile 12 Market', img: '/path/to/mile12-market.png' },
      { name: 'Oniru New Market', img: '/path/to/oniru-new-market.png' },
      { name: 'Fespar Market', img: '/path/to/fespar-market.png' },
      { name: 'Oshodi Market', img: '/path/to/oshodi-market.png' },
      { name: 'Rauf Aregbesola Market', img: '/path/to/rauf-aregbesola-market.png' },
      { name: 'Téjúoshó Market', img: '/path/to/tejushosho-market.png' },
      { name: 'Sangotedo Market', img: '/path/to/sangotedo-market.png' },
      { name: 'Ajuwe Market', img: '/path/to/ajuwe-market.png' },
      { name: 'Jakande Market', img: '/path/to/jakande-market.png' },
      { name: 'Akodo Market, Epe', img: '/path/to/akodo-market.png' },
      { name: 'Boundary Seafood Market', img: '/path/to/boundary-seafood-market.png' },
      { name: 'Apongbo Market', img: '/path/to/apongbo-market.png' },
      { name: 'Liverpool Crayfish Market', img: '/path/to/liverpool-crayfish-market.png' },
      { name: 'Arena Market', img: '/path/to/arena-market.png' },
      { name: 'Cele Market', img: '/path/to/cele-market.png' },
      { name: 'Ijesha Market, Ijeshatedo', img: '/path/to/ijesha-market.png' },
      { name: 'State Market', img: '/path/to/state-market.png' },
      { name: 'Agege Market', img: '/path/to/agege-market.png' },
    ],
};

const MarketPage = () => {
  const [selectedState, setSelectedState] = useState('Abia');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = markets[selectedState]?.filter((market) =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white text-green py-2 drop-shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
            {/* Left Section with Markets and Malls */}
            <div className='flex items-center space-x-4'>
              <Link to="/markets" className="text-lg font-semibold">
                Markets
              </Link>
              <Link to="/malls" className="text-lg font-semibold">
                Malls
              </Link>
            </div>
          
          {/* Center Section - Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="flex items-center bg-white border border-green text-gray-600 rounded-full px-4 py-2 w-full max-w-md focus:ring-green focus:ring-opacity-50">
              <input
                type="text"
                placeholder={`Search ${selectedState} markets...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-sm px-2"
              />
              <img src={searchIcon} alt="Search" className="h-5 w-5" />
            </div>
            
          </div>
          
          {/* Empty Right Side (Optional for now) */}
          <div className='flex items-center space-x-4'></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex ">
        {/* Sidebar: List of States */}
        <aside className="w-64 bg-white h-full p-4 shadow-lg">
          <ul className="space-y-2">
            {states.map((state) => (
              <li
                key={state}
                onClick={() => setSelectedState(state)}
                className={`cursor-pointer p-2 ${
                  selectedState === state ? 'bg-green text-white' : 'text-gray-800'
                } hover:bg-green hover:opacity-75 hover:text-white rounded-lg focus:font-semibold`}
              >
                {state}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content: Markets */}
        <div className="w-full bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedState} State Markets</h2>
          </div>

          {/* Market Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={market.img}
                    alt={market.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{market.name}</h3>
                    <a
                      href="#"
                      className="text-green text-sm hover:underline mt-2 block"
                    >
                      View more
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No markets found for "{searchTerm}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;