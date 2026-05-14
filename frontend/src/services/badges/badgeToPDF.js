import { jsPDF } from "jspdf";
import { scaleFont } from "@/services/functions/TextManipulationService.ts";
import html2canvas from "html2canvas";

async function select2Canvas( s, d ) {
  const selector = document.querySelector( s )
  await html2canvas( selector, {
    allowTaint: true,
    useCORS: true
  } ).then( canvas => {
    d.value = canvas.toDataURL(
      "image/png" )
    console.log( canvas )
  } )
  console.log( selector )
  console.log( d )
}

/*-| Store Badge Dimensions, Placement |-*/
const badge = {
  h: 3,
  w: 4,
  p: 0.1875,
  imgW: 1.9375,
  imgH: 1.1875,
  rot: 0
}

const pt2in = 0.0138888889

/*-| Print the dang Badge. |-*/
export async function badgeToPDF_Service( a, expo, qr, logo ) {
  console.log( "Creating badge for: " + a.name_First )

  console.log( "Leads enabled? " + expo.leadEnabled )

  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF( {
    orientation: "landscape",
    unit: "in",
    format: [ badge.w, badge.h ],
    putOnlyUsedFonts: true
  } )

  /*-| Add Elements
  ---+----+---+----+---+----+---+----+---*/
  const nameSize = scaleFont( a.name_First + a.name_Last, 400 )
  const titleSize = scaleFont( a.title, 400, 14, 20 )
  const employSize = scaleFont( a.contact_Employer, 400, 16, 20 )

  // Name
  badgePdf.setFont( "Helvetica", "normal", "bold" );
  badgePdf.setFontSize( nameSize )
  badgePdf.text( `${ a.name_First } ${ a.name_Last }`,
    badge.p,
    ((employSize * pt2in) / 3) + ((nameSize + employSize) * pt2in) + (badge.p / 2),
    { align: "left" } )

  // Title
  badgePdf.setFont( "Helvetica", "italic" );
  badgePdf.setFontSize( titleSize )
  badgePdf.text(
    a.title,
    badge.p,
    +((nameSize * pt2in) / 3) + ((nameSize + employSize + titleSize) * pt2in) + badge.p,
    { align: "left" } )

  // Employer
  badgePdf.setFont( "Helvetica", "normal" );
  badgePdf.setFontSize( employSize )
  badgePdf.text(
    a.contact_Employer,
    badge.p,
    badge.p * 2,
    { align: "left" } )

  let logoX = 0

  /*-| Add QR Code |-*/
  if ( expo.leadEnabled ) {
    await select2Canvas( "#qr-code", qr )
    badgePdf.addImage(
      qr.value,
      "PNG",
      badge.p,
      badge.h - badge.imgH - badge.p,
      badge.imgH,
      badge.imgH,
      "qr",
      "FAST",
      badge.rot )
    logoX = badge.w - badge.p - badge.imgW
  }

  /*-| Add Logo |-*/
  await select2Canvas( "#badge-logo", logo )
  badgePdf.addImage(
    logo.value,
    "PNG",
    logoX,
    badge.h - badge.imgH - badge.p,
    badge.imgW,
    badge.imgH,
    "logo",
    "FAST",
    badge.rot )

  setTimeout( () => {
    badgePdf.output( "dataurlnewwindow" )
  }, 300 )
}
