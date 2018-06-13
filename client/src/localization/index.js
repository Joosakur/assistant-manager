import LocalizedStrings from 'react-localization'

const m = new LocalizedStrings({
  fi: {
    errorCodes: {
      CONNECTION_ERROR: 'Yhteysongelma',
      VALIDATION_FAILED: 'Virheellisesti täytettyjä kenttiä',
      AUTHENTICATION_ERROR: 'Tunnistautuminen epäonnistui',
      AUTHORIZATION_ERROR: 'Oikeudet toimintoon puuttuvat',
      BAD_CREDENTIALS: 'Virheellinen sähköposti tai salasana',
      ACCOUNT_NOT_VERIFIED: 'Sähköposti on vielä varmentamatta, klikkaa linkkiä saapuneesta viestistä.'
    },
    validation: {
      required: 'Pakollinen kenttä',
      minLength: 'Vähintään {0} merkkiä',
      maxLength: 'Korkeintaan {0} merkkiä',
      number: 'Virheellinen numero',
      minValue: 'Vähintään {0}',
      maxValue: 'Korkeintaan {0}',
      email: 'Virheellinen sähköpostiosoite',
      date: 'Anna päivämäärä muodossa {0}',
      dateBefore: 'Oltava ennen {0}',
      dateAfter: 'Oltava aikaisintaan {0}',
      dateBetween: 'Oltava välillä {0} - {1}'
    },
    nav: {
      home: 'Koti',
      assistants: 'Avustajani',
      schedule: 'Työvuorot',
      reporting: 'Tuntilistat',
      signIn: 'Kirjaudu',
      signUp: 'Rekisteröidy',
      signOut: 'Kirjaudu ulos'
    },
    signUp: {
      title: 'Rekisteröidy käyttäjäksi',
      email: 'Sähköposti',
      password: 'Salasana',
      firstName: 'Etunimi',
      lastName: 'Sukunimi',
      birthday: 'Syntymäaika',
      city: 'Kotikunta',
      cbox1a: 'Kuulun ',
      cbox1b: 'HETA-liittoon',
      cbox2a: 'Hyväksyn palvelun ',
      cbox2b: 'käyttöehdot',
      submitBtn: 'Liity mukaan!',
      notRobot: 'Auta osoittamaan ettet ole robotti',
      error: 'Rekisteröityminen epäonnistui'
    },
    registered: {
      title: 'Kiitos kun rekisteröidyit!',
      subtitle: 'Odottaa sähköpostin varmennusta',
      p1: 'Sähköpostisi täytyy vielä varmentaa. Tarkista sähköpostisi ja klikkaa saamaasi vahvistuslinkkiä ennen sisäänkirjautumista.'
    },
    verification: {
      verifying: 'Varmennetaan...',
      errorTitle: 'Voi ei, jotain meni pieleen ja varmentaminen epäonnistui',
      title: 'Sähköpostisi on varmennettu ja tilisi on aktivoitu!',
      subtitle: 'Voit nyt kirjautua sisään',
      proceedBtn: 'Jatka kirjautumiseen '
    },
    signIn: {
      email: 'Sähköposti',
      password: 'Salasana',
      submitBtn: 'Kirjaudu sisään'
    },
    home: {
      title: 'Assistant Manager',
      p1: 'Web-sovellus henkilökohtaisten avustajien työvuorojen suunnitteluun, kirjanpitoon ja raportointiin.',
    },
    profile: {
      tabs: {
        userDetails: 'Käyttäjätiedot',
        emailChange: 'Vaihda sähköpostiosoite',
        passwordChange: 'Vaihda salasana'
      },
      userDetails: {
        title: 'Käyttäjätiedot',
        firstName: 'Etunimi',
        lastName: 'Sukunimi',
        birthday: 'Syntymäaika',
        city: 'Kotikunta',
        cbox1a: 'Kuulun ',
        cbox1b: 'HETA-liittoon',
        submitBtn: 'Tallenna',
      }
    },
    assistants: {
      title: 'Avustajani',
      buttons: {
        add: 'Lisää uusi',
        share: 'Jaa työvuorolista',
        edit: 'Muokkaa'
      },
      share: {
        title: 'Jaa linkki avustajalle',
        p1: 'Avustajasi voi katsoa työvuoronsa tämän linkin kautta: ',
        p2: 'Avustajan omat vuorot näkyvät valitulla värillä. Muiden avustajien vuorot näkyvät harmaina. Arkistoitujen avustajien vuoroja ja sairaspoissaoloja ei näytetä.',
        copyBtn: 'Kopioi linkki'
      },
      edit: {
        titleNew: 'Lisää uusi avustaja',
        titleEdit: 'Muokkaa avustajaa',
        firstName: 'Etunimi',
        lastName: 'Sukunimi',
        nickName: 'Lempinimi',
        birthday: 'Syntymäaika',
        backgroundColor: 'Taustaväri',
        textInvert: 'Valkoinen teksti',
        cancelBtn: 'Peruuta',
        saveBtn: 'Tallenna'
      },
      errors: {
        list: 'Avustajien lataaminen epäonnistui',
        create: 'Avustajan lisääminen epäonnistui',
        edit: 'Muutosten tallentaminen epäonnistui'
      }
    },
    schedule: {
      title: 'Työvuorot',
      addBtn: 'Lisää uusi',
      unassigned: 'Ei avustajaa',
      edit: {
        titleNew: 'Lisää uusi työvuooro',
        titleEdit: 'Muokkaa työvuooroa',
        assistant: 'Avustaja',
        startDate: 'Aloituspäivä',
        startTime: 'Aloitusaika',
        endTime: 'Lopetusaika',
        sick: 'Sairaspoissaolo?',
        deleteBtn: 'Poista',
        cancelBtn: 'Peruuta',
        saveBtn: 'Tallenna'
      },
      errors: {
        list: 'Työvuorojen lataaminen epäonnistui',
        create: 'Työvuron lisääminen epäonnistui',
        edit: 'Muutosten tallentaminen epäonnistui',
        del: 'Työvuoron poistaminen epäonnistui',
        copy: 'Työvuorojen kopiointi epäonnistui'
      }
    },
    reporting: {
      title: 'Tuntilistat',
      subtitle: 'Lataa tuntilista kaupungin palkanlaskentaa varten',
      assistant: 'Avustaja',
      startDate: 'Alkupäivämäärä',
      endDate: 'Loppupäivämäärä',
      year: 'Vuosi',
      month: 'Kuukausi',
      range: 'Väli',
      range0: 'Koko kuukausi',
      range1: 'Alkupuoli',
      range2: 'Loppupuoli',
      startBtn: 'Muodosta tuntilista',
      downloadBtn: 'Lataa tuntilista',
      p1: 'Toiminto tuottaa tuntilistan .ods laskentataulukkona, jonka voit avaa esimerkiksi riittävän uudella Microsoft Excelillä tai ilmaisella OpenOffice Calc -ohjelmalla.',
      p2: 'Huom! Assistant Manager on vielä Alpha-vaiheessa, joten tuntilistan sisältö kannattaa vielä tarkistaa etenkin pyhäkorvausten ja muiden poikkeusten osalta, ja tehdä tarvittavat korjaukset ennen tulostamista.',
      errors: {
        request: 'Tuntilistan käsittely epäonnistui',
        download: 'Tuntilistan lataaminen epäonnistui',
        tryAgain: 'Ole hyvä ja yritä uudelleen'
      }
    }
  }
})

export default m
