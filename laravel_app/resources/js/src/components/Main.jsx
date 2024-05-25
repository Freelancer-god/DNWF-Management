import React from 'react';
import {
  SarrowDown,
  SarrowLeft,
  Scart,
  Scart2,
  Snotification,
  Ssearch,
  Ssender,
} from './Svg';
import {
  Tbtn, Timage, Tinput, Tspan,
} from './Tags';
import Avatar from '../assets/avatar.png';
import BackSLid from '../assets/asasf.png';
import Warrior from '../assets/Warrior.png';
import Card7667 from '../assets/7667.png';
import Card453453 from '../assets/453453.png';
import Callduty from '../assets/11.png';
import Maincrty from '../assets/7667.png';
import Dog from '../assets/dog.png';
import Zombi from '../assets/456456.png';
import Backgrid from '../assets/asasfas.png';
import Hidegrid from '../assets/Hidegrid.png';

function Main() {
  function CardSecOne({ src, title, sub }) {
    return (
      <div className="card_first_Sect">
        <Timage src={src} clas="cover_Card" />
        <div className="titles_Cards">
          <Tspan clas="title_main" title={title} />
          <Tspan clas="sub_title" title={sub} />
        </div>
        <SarrowDown clas="arrow_download" />
      </div>
    );
  }
  function CardSecUser({ src, title, sub }) {
    return (
      <div className="card_first_Sect">
        <Timage src={src} clas="avatar_Card" />
        <div className="titles_infos">
          <Tspan clas="title_username" title={title} />
          <Tspan clas="sub_username" title={sub} />
        </div>
        <Tspan clas="point_online" />
      </div>
    );
  }
  return (
    <main>
      <section className="head">
        <div className="bowl_Search">
          <Ssearch clas="icon_search" />
          <Tinput plc="search anything.." clas="input_Searchc" />
        </div>

        <div className="option_user">
          <Snotification clas="icon_option" />
          <Ssender clas="icon_option active" />
          <Timage src={Avatar} clas="icon_option" />
        </div>
      </section>

      <div className="content">
        {/* right side */}
        <div className="content_center">
          {/* first section */}
          <div className="slider">
            <Timage clas="backimag_Slide" src={BackSLid} />
            <div className="flow_slider">
              <div className="title_slide">
                <Tspan clas="year_game" title="2022" />
                <Tspan clas="title_game" title="Assassin’s creed valhalla" />
              </div>
              <div className="btn_to_cart">
                <Tspan clas="first_price" title="29$" />
                <div className="btn_Carts_Add">
                  <Scart2 clas="" />
                  <Tspan title="Add to cart" />
                </div>
              </div>
              <Timage src={Warrior} clas="Warrior" />
            </div>
          </div>
          {/* second grid */}

          <div className="grid">
            <div className="cover_grif">
              <Timage clas="back_hide" src={Backgrid} />
              <div className="flow_cover_grid">
                <div className="tile_frid_flow">
                  <Tspan title="Best Gaming Headset" />
                  <SarrowLeft clas="arrowleft" />
                </div>
                <Timage clas="" src={Hidegrid} />
              </div>
            </div>

            <div className="list_grif">
              <Timage src={Callduty} clas="image_Cover_grid" />
              <Timage src={Maincrty} clas="image_Cover_grid" />
              <Timage src={Zombi} clas="image_Cover_grid" />
            </div>
          </div>
        </div>

        {/* left side */}
        <aside>
          <div className="first_Sectin">
            <Tspan title="Library" clas="Library" />
            <CardSecOne
              src={Card7667}
              title="Minecracft"
              sub="Ps5 & xbox & PC"
            />
            <CardSecOne
              src={Card453453}
              title="Assassin creed 2"
              sub="xbox & PC"
            />
            <CardSecOne
              src={Card7667}
              title="Minecracft"
              sub="Ps5 & xbox & PC"
            />
          </div>
          <div className="box_email">
            <Tspan title="Mail" />
            <textarea placeholder="Nothing to show Right now" />
          </div>

          <div className="first_Sectin">
            <Tspan title="Online Friends" clas="Online" />
            <CardSecUser
              src={Avatar}
              title="Goodboi79"
              sub="Playing Rocket league"
            />
            <CardSecUser
              src={Dog}
              title="Doglover96"
              sub="Playing Counter strike"
            />
            <CardSecUser
              src={Dog}
              title="iamgoat__"
              sub="Playing Goat simulater"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Main;
