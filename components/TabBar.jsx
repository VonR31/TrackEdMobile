import { View, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { tw } from 'react-native-tailwindcss';
import React from 'react';
import TabBarButton from './TabBarButton';


export function TabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();


  return (
    <View style={[
        tw.absolute, 
        tw.flexRow, 
        tw.justifyBetween, 
        tw.itemsCenter, tw.bgWhite, {
            bottom: 40, 
            marginHorizontal: 80, 
            paddingVertical: 15, 
            borderRadius: 35, 
            shadowColor:'#000', 
            shadowOffset:{width: 0, height: 10},
            shadowRadius: 10,
            shadowOpacity: 0.1
            } 
        ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? colors: isFocused ? "#673ab7" : "#222"}
                label={label}
            />
        );
      })}
    </View>
  );
}