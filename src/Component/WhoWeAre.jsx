import React, { Component } from "react";

export default class Navigation extends Component {
  state = { activeItem: " " };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div style={{ textAlign: "left" }}>
        <h4 style={{ textAlign: "center" }}>BİZ KİMİZ</h4>
        <p>
          Araç modelleri konusunda değer yaratan ve alışverişte devamlılığı
          hedefleyen bir firmayız. Girişimcilik hedeflerimizi hızlandırarak
          vizyonumuz ile en son teknolojiye uygun olarak, uygun fiyatlarda çok
          çeşitli araç satışı yaparak müşterileri istedikleri araçlarla
          buluşturuyoruz. Böylece araç çeşitliliğini tüm Türkiye’de
          yaygınlaşmasını hedefleyerek yenilikçi bir vizyonla müşterilerimizin
          karşısına çıkmak istiyoruz. Yenilenen teknolojiye ayak uydurarak
          alışverişi bir tık uzağınıza yerleştiriyoruz. Keyifli alışverişler.
        </p>
      </div>
    );
  }
}
