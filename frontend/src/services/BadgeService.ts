/*import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { ref } from 'vue'

/!*-| Turns Designated HTML element into canvas, converts to BASE64 Data URL |-*!/

/!*---+----+---+----+---+----+---+----+---*!/
async function select2Canvas(s, d) {
  const selector = document.querySelector(s)
  await html2canvas(selector, {
    allowTaint: true,
    useCORS: true
  }).then(canvas => {
    d = canvas.toDataURL(
      'image/png')
    console.log(canvas)
  })
}

/!*-| Creates Single Badge, sends to print. |-*!/
export async function printSingleBadge_Service(
  a: any,
  qrId: String,
  qrObj: any,
  logoId: String,
  logoObj: any
) {

  let qrData = qrObj
  let logoData = logoObj

  await select2Canvas(qrId, qrData)
  await select2Canvas(logoId, logoData)
  /!*-| Store Badge Dimensions, Placement |-*!/
  const dim = {
    h: 3,
    w: 4,
    p: 0.1875,
    imgW: 1.875,
    imgH: 1.125,
    rot: 90
  }
  /!*-| Declare Badge |-*!/
  const badgePdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [dim.w, dim.h]
  })

  /!*-| Boundary |-*!/
  badgePdf.setLineWidth(.1)
  // badgePdf.rect( 0, 0, dim.h, dim.w )
  /!*-| Add QR Code |-*!/
  console.log(qrObj)
  badgePdf.addImage(qrData, 'PNG', dim.h - dim.p, dim.w - dim.imgH - dim.p, dim.imgH, dim.imgH, 'qr', 'FAST', dim.rot)
  /!*-| Add Logo |-*!/
  badgePdf.addImage(logoData, 'PNG', dim.h - dim.p, dim.p * 4, dim.imgW, dim.imgH, 'logo', 'FAST', dim.rot)
  /!*-| Text |-*!/
  badgePdf.setFontSize(18)
  badgePdf.text(a.contact_Employer, dim.p * 2, dim.w - dim.p, null, dim.rot)
  badgePdf.setFontSize(22)
  badgePdf.text(`${a.name_First} ${a.name_Last}`, dim.p * 4, dim.w - dim.p, dim.rot)
  badgePdf.setFontSize(18)
  badgePdf.text(a.title, dim.p * 6, dim.w - dim.p, dim.rot)
  setTimeout(() => {
    badgePdf.output('dataurlnewwindow')
  }, 300)
}*/
