import React, { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ImageSourcePropType,
} from "react-native";

import { icons } from "../constants";

interface SearchInputProps {
  initialQuery?: string | string[];
  refetch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery = "",
  refetch,
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (typeof initialQuery === "string") {
      setQuery(initialQuery);
    } else if (Array.isArray(initialQuery) && initialQuery.length > 0) {
      setQuery(initialQuery[0]);
    }
  }, [initialQuery]);

  const handleSearch = (): void => {
    if (query.trim() === "") {
      Alert.alert(
        "Missing Query",
        "Please input something to search results across database"
      );
      return;
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <View className="mt-6 mb-8">
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder="Search a video topic"
          placeholderTextColor="#CDCDE0"
          onChangeText={(text: string) => setQuery(text)}
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={icons.search as ImageSourcePropType}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
