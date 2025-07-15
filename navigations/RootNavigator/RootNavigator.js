import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import EnteranceApp from "../../store-data/Services/EntranceAppService/EntranceApp";
import DrawerNavigator from "../AppNavigator/DrawerNavigator";
import { Image, ImageBackground } from "react-native";
import AuthNavigator from "../AuthNavigator/AuthNavigator";

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkEntrance = async () => {
      const result = await EnteranceApp(dispatch);
      setIsAuthenticated(result.success);

      setIsLoading(false); // Yüklenmeyi bitir
    };

    checkEntrance();
  }, []); // İlk renderda çalışacak

  if (isLoading) {
    return (
      <ImageBackground
        source={require("./assets/saat_kulesi2.jpg")}
        style={styles.container}
      >
        <Image source={require("./assets/Logo.jpg")} style={styles.image} />
      </ImageBackground>
    ); // Yükleniyor durumu
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
