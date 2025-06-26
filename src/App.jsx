import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
  return (
    <main className="w-full">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-6">
        <div>
          <List />
        </div>

        <div>
          <Map />
        </div>
      </div>

      <PlaceDetails />
    </main>
  );
};

export default App;
