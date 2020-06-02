import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { calculateDays } from "../../../assets/js/utils";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "justify"
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold
  },
  sigContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center"
  },
  sig: {
    width: 120
  },
  pinkRose: {
    width: 200,
    position: "absolute",
    zIndex: -1,
    opacity: ".85",
    right: 0,
    top: -50
  },
  pinkFlowers: {
    width: 300,
    position: "absolute",
    zIndex: -1,
    opacity: ".8",
    left: -100,
    top: -40
  }
}));

export default function RedRoseBouquetComponent() {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <img
        className={classes.pinkRose}
        src="https://storage.googleapis.com/kotii-7ae8f.appspot.com/static/pink-rose.png"
        alt=""
      />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Red Rose Bouquet
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        &emsp; Sayaaaang! Selamat hari selasaaa. Ini hari ke 268 kitaa. Ga
        kerasaa sudah sejauh inii, sama kamu tuh kaya ngerasa masih baru teruus.
        Ngerasa kaya kmarin baru selesai SI, masih seneng setelah semua selesai
        tapi juga bingung karna nganggur ga punya kerjaan hehehe. Pokoknya
        sekarang ini aku seneng banget bisa bareng kamu. Yang aku bayangin kalo
        sudah kerja tuh hari-hari yang monoton, tiap hari teteep aja yang
        dikerjain itu-itu jugaa. Ga ada challenging nyaa. Beda jauh sama
        kehidupanku waktu kuliah yang full padet. Ternyataa, sekarang aku punya
        kamuu. Hidupku lebih dinamis hehe. Dinamis yang bagus kokk. Ada naik
        turun nyaa. Kadang seneng-seneng, ketawa bareng, meskipun di video call.
        Kadang juga ada berantemnya dikit-dikit. Gapapa, ibarat masakan, harus
        banyak bumbunya. Ada yang manis ada yang pedes. Tapi kalo dicampur semua
        rasanya jadi ennak, malah bikin mau teruuss. Pokoknya gitu. Aku mau sama
        kamuu.
      </Typography>
      <br />
      <Box position="relative">
        <img
          className={classes.pinkFlowers}
          src="https://storage.googleapis.com/kotii-7ae8f.appspot.com/static/pink-flowers.png"
          alt=""
        />
        <Typography variant="body1">
          &emsp; Jangan nyerah ya kitaa. Bener banget post di instagram yang
          kamu kmarin kirim ke aku. Tentang power stage power stage apa lah itu.
          Kita lagi ngalamin itu kayanya. Kita makin notice differences kita.
          Tapi gapapaa. Kan kita emang beda, diciptakan buat saling melengkapii.
          Ga ada dan ga bakal mungkin nemu yang sempurnaa. Yang bisa kita lakuin
          ya bersyukur sama apa yang kita punya sekarang. Di jaga n dirawat
          baik-baik. Supaya awet, ga kadaluarsa hehe. Aku sayang kamu. Sayang
          banget. Semarah-marahnya aku sama kamu tuh tetep ga bisa ngalahin
          sayangnya aku kokk. Maafin yaa buat 267 hari kebelakang kalo aku
          sering ngeselin, jahat, atau ga sesuai ekspektasi kamu. Harus
          maklumiin. Harus saling melengkapiii. Harus saling dealing with each
          other n saling nerimaa. Pokoknya mau sama kamu. Ini bunga buat kamuu.
          Maaf yaa aku ga peka orangnya hehe. Mau kirim bunga aja harus ditagih
          duluu, bukan di code lagi hehe. Besok lagi kalo mau apa-apa bilaang.
          Tapi aku juga berusaha lebih peka kokk. Love you so much dear!
        </Typography>
      </Box>

      <Box className={classes.sigContainer}>
        <img
          className={classes.sig}
          src="data:image/png;base64,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"
          alt=""
        />
      </Box>
    </Box>
  );
}
