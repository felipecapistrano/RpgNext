import Link from "next/link";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import useSWR from "swr";

import AddResources from "./AddResources";
import DeleteIcon from "@material-ui/icons/Delete";

export function Resources({ isOwner, game }) {
  const { data: resources, mutate } = useSWR(
    `/api/resources/get?gameId=${game}`
  );
  async function eraseResource(id) {
    await axios.post(`/api/resources/delete`, { _id: id, gameId: game });
    mutate();
  }

  if (!resources) return <CircularProgress />;
  return (
    <>
      {resources.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Link</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell style={{ color: "#512da8", fontWeight: 600 }}>
                  <Link href={row.link}>{row.link}</Link>
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="flex-end">
                    <DeleteIcon
                      onClick={() => eraseResource(row._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>This game has no resources</Typography>
      )}
      {isOwner && <AddResources game={game} />}
    </>
  );
}
