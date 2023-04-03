import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <BigCard title="Internal links">
          <Link to="/protected">go to protected</Link>
        </BigCard>
        <BigCard title="Forms">
          <Link to="/forms/validations">validations</Link>
        </BigCard>
      </Grid>
    </Container>
  );
};

export default Home;

const BigCard = ({ children, title }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader title={title} />
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
};
