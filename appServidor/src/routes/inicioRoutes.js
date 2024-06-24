const express = require("express");
const router = express.Router();
const {
  getTotalBienes,
  getTotalAreas,
  getTotalProveedores,
  getTotalUsuarios,
  getFacultades,
  getBloques,
  getBienesPorArea,
  //
  getTotalComponentesLibres,
  getTotalBienesMobiliarios,
  getTotalRepotencias,
  getTotalBienesTecnologicosBodega,
  getTotalBienesTecnologicosNoFuncional,
  getRepotenciadosPorArea

} = require("../controllers/inicioController.js");

router.get("/total-bienes", getTotalBienes);
router.get("/total-areas", getTotalAreas);
router.get("/total-proveedores", getTotalProveedores);
router.get("/total-usuarios", getTotalUsuarios);
router.get("/facultades", getFacultades);
router.get("/bloques", getBloques);
router.get("/bienes-por-area", getBienesPorArea);
//cambios
router.get("/componentesLibres", getTotalComponentesLibres);
router.get("/totalbienesmobilarios", getTotalBienesMobiliarios);
router.get("/totalrepotencias", getTotalRepotencias);
router.get("/tecnologicosBodega",getTotalBienesTecnologicosBodega)
router.get("/tecnologicosNoFuncional",getTotalBienesTecnologicosNoFuncional)
router.get("/repotenciadoPorArea", getRepotenciadosPorArea)
module.exports = router;

