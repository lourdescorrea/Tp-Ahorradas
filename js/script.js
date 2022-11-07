const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnPlusOperation = $("#btnPlusOperation"); // boton + nueva operacion //
const $btnNewAdd = $("#btnNewAdd"); //boton de agregar en la pantalla nueva operacion //
const $btnNewCancel = $("#btnNewCancel"); //boton cancelar en pantalla nueva operacion
const $btnEditAdd = $("#btnEditAdd"); //boton editar formulario en pantalla editar operacion
const $btnEditCancel = $("#btnEditCancel"); //bonton cancelar desde pantalla editar
const $formEDit = $("#formEDit"); //id del form
const $tableOperations = $("#tableOperations"); //id de la tabla

// seletores nav
const navBalance = $("#navBalance");
const navCategories = $("#navCategories");
const navReports = $("#navReports");

// selectores formularios
const balance = $("#balance");
const categories = $("#categories");
const reports = $("#reports");
const addNewOperation = $("#addNewOperation");
const containerImage = $("#containerImage");
const textOperations = $("#textOperations");

const LS_KEYS = {
  operations: "operations",
  categories: "categories",
};

const CATEGORIES_BASE = [
  {
    id: 0,
    name: "Comida",
  },
  {
    id: 1,
    name: "Servicios",
  },
  {
    id: 2,
    name: "Salidas",
  },
  {
    id: 3,
    name: "Educacion",
  },
  {
    id: 4,
    name: "Transporte",
  },
  {
    id: 5,
    name: "Trabajo",
  },
];
