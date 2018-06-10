import LocalizedStrings from 'react-localization'

const m = new LocalizedStrings({
  en: {
    nav: {
      home: '',
      assistants: '',
      schedule: '',
      reporting: '',
      signIn: '',
      signUp: '',
      signOut: '',
      loggedIn: ''
    },
    signUp: {
      title: '',
      subtitle: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: '',
      city: '',
      cbox1a: '',
      cbox1b: '',
      cbox2a: '',
      cbox2b: '',
      submit: '',
    },
    registered: {
      title: '',
      subtitle: '',
      p1: '',
    },
    verification: {
      verifying: '',
      errorTitle: '',
      title: '',
      subtitle: '',
      proceedBtn: ''
    },
    signIn: {
      email: '',
      password: '',
      submit: ''
    },
    home: {
      title: '',
      p1: '',
    },
    assistants: {
      title: '',
      buttons: {
        add: '',
        share: '',
        edit: ''
      },
      share: {
        title: '',
        p1: '',
        p2: '',
        copyBtn: ''
      },
      edit: {
        titleNew: '',
        titleEdit: '',
        firstName: '',
        lastName: '',
        nickName: '',
        birthday: '',
        backgroundColor: '',
        textInvert: '',
        cancelBtn: '',
        saveBtn: '',
      }
    },
    schedule: {
      title: '',
      addBtn: '',
      edit: {
        titleNew: '',
        titleEdit: '',
        assistant: '',
        startDate: '',
        endTime: '',
        sick: '',
        deleteBtn: '',
        cancelBtn: '',
        saveBtn: ''
      }
    },
    reporting: {
      title: '',
      subtitle: '',
      assistant: '',
      startDate: '',
      endDate: '',
      year: '',
      month: '',
      range0: '',
      range1: '',
      range2: '',
      startBtn: '',
      downloadBtn: '',
      p1: '',
      p2: '',
    }
  },
  fi: {
    nav: {
      home: 'Koti',
      assistants: 'Avustajani',
      schedule: 'Työvuorot',
      reporting: 'Tuntilistat',
      signIn: 'Kirjaudu',
      signUp: 'Rekisteröidy',
      signOut: 'Kirjaudu ulos',
      loggedIn: 'Kirjautunut käyttäjänä'
    },
    signUp: {
      title: 'Rekisteröidy käyttäjäksi',
      subtitle: 'Täytä tietosi',
      email: 'Sähköposti',
      password: 'Salasana (vähintään 8 merkkiä)',
      firstName: 'Etunimi',
      lastName: 'Sukunimi',
      birthday: 'Syntymäaika',
      city: 'Kotikunta',
      cbox1a: 'Kuulun ',
      cbox1b: 'HETA-liittoon',
      cbox2a: 'Hyväksyn palvelun ',
      cbox2b: 'käyttöehdot',
      submitBtn: 'Liity mukaan!',
      notRobot: 'Auta osoittamaan ettet ole robotti'
    },
    registered: {
      title: 'Kiitos kun rekisteröidyit!',
      subtitle: 'Odottaa sähköpostin varmennusta',
      p1: 'Sähköpostisi täytyy vielä varmentaa. Tarkista sähköpostisi ja klikkaa saamaasi vahvistuslinkkiä ennen sisäänkirjautumista.',
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
    }
  }
})

export default m
