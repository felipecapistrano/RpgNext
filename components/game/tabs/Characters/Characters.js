import { Button, CircularProgress, Typography } from "@material-ui/core";
import useSWR from "swr";
import CharacterContainer from "./CharacterContainer";

export function Characters({ sheet, game, user }) {
  const { data: characters } = useSWR(`/api/characters/get?gameId=${game}`);

  if (!characters) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4">NPCS</Typography>
      {characters.npcs.length ? (
        <CharacterContainer
          characters={characters.npcs}
          sheet={sheet}
          game={game}
          user={user}
        />
      ) : (
        <Typography>There are no npcs currently created</Typography>
      )}
      <Typography variant="h4">Players</Typography>
      {characters.players.length ? (
        <CharacterContainer
          characters={characters.players}
          sheet={sheet}
          game={game}
          user={user}
        />
      ) : (
        <Typography>There are no players currently created</Typography>
      )}
    </>
  );
}
