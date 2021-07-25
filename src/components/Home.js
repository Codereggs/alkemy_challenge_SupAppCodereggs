import React from "react";
import { CardGroup } from "react-bootstrap";
import SuperHeroCard from "./SuperHeroCard";

export default function Home() {
  return (
    <div>
      <h3>Team SuperHero</h3>
      <div />
      <hr />
      <CardGroup>
        <SuperHeroCard id="10" />
        <SuperHeroCard id="20" />
        <SuperHeroCard id="30" />
        <SuperHeroCard id="40" />
        <SuperHeroCard id="50" />
        <SuperHeroCard id="60" />
      </CardGroup>
    </div>
  );
}
