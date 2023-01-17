import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useFoo } from './utils/api';
import { APP_STYLES as styles } from './utils/styles';
import { APP_COPY as copy } from './utils/strings';

export default function App() {
  const { data: foo, isError, isSuccess, isLoading } = useFoo();

  const [fetched, setFetched] = useState(false);

  const onFetch = () => setFetched(true);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {!fetched && <Button title={copy.cta} onPress={onFetch} />}
        {fetched && (
          <>
            {isLoading && <ActivityIndicator />}
            {isSuccess && <Text>{foo.foo}</Text>}
            {isError && <Text>{copy.error}</Text>}
          </>
        )}
      </View>
    </>
  );
}
