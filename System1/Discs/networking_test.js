

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested

import { Game } from "../Core/Game.js";
import { initState } from "../State/state.js";

export const disc = new Game("networking_test");

disc.load = function(){
  //

  // initState({ shouldConnectToNetwork: true });
  initState({ shouldConnectToNetwork: false });

  console.log('STATE INITIALIZED!');

  // changing the screen space mode for a platformer game
  // this.system.screenSpaceMode = this.system.screenModes.screen;
  // this.system.reboot();

  //

  // common div building patteren for now

  //
  // var gg = document.getElementById("gamespace");
  // gg.innerHTML = "";
  // // document.body.appendChild(controls);
  // var gamestyles = document.getElementById("gamestyles");
  //
  // var panel = document.createElement('div');
  // panel.id = "panel";
  // panel.style.cssText = `
  // position: absolute;
  // ___overflow: hidden;
  // top: 0px;
  // left: 0px;
  // z-index: 2;
  // background: black;
  // width: 170px;
  // min-height: 600px;
  // padding: 20px 0 0 0;
  // border-right : 1px white solid;
  // /* flex box */
  // display: flex;
  // flex-direction: column;
  // flex-wrap: nowrap;
  // justify-content: flex-start;
  // align-content: stretch;
  // align-items: center;
  // `;
  // gg.appendChild(panel);
  //
  //
  // // this needs to be a webcompontent for the css to not get duplicated
  // // or we cram css into the dom since we can select the syle tag with an id!
  // var item = document.createElement('div');
  // item.classList.add("item");
  // var itemstyle = `
  // #panel .item {
  //   background: white;
  //   width: 60px;
  //   height: 60px;
  //   margin-bottom: 12px;
  //   ____padding: 20px 0 0 0px;
  //   border : 1px white solid;
  //   border-radius: 12px;
  //
  //   order: 0;
  //   flex: 0 1 auto;
  //   align-self: auto;
  // }
  // `;
  // gamestyles.innerHTML += itemstyle;
  //
  // panel.appendChild(item);
  //



};
