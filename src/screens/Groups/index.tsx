import { Highlight } from "@components/Highlight";
import { FlatList, Alert } from "react-native";
import { useState, useCallback } from "react";
import { Container, Content } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsloading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      setIsloading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas");
    } finally {
      setIsloading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Content>
        <Highlight title="Turmas" subtitle="jogue com a sua turma" />
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Que tal cadastrar a primeira turma" />
            )}
            contentContainerStyle={[groups.length === 0 && { flex: 1 }]}
            showsVerticalScrollIndicator={false}
          />
        )}
        <Button
          onPress={handleNewGroup}
          style={{ margin: 20 }}
          title="Criar no turma"
        />
      </Content>
    </Container>
  );
}
