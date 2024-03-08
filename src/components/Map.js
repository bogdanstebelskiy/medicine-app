import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAo36Ex5Jbc08GA-aHcNmfzUZTLkKEU4Bs',
    });

    const center = {
        lat: 40.930610,
        lng: -73.935242,
    };

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '280px' }}
                    center={center}
                    zoom={8}
                >
                    <Marker
                        position={center}
                    />
                </GoogleMap>
            ) : <div>Loading...</div>}
        </div>
    );
};

export default Map;