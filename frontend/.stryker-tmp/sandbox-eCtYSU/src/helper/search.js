// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { isEmpty } from 'lodash';
import { GROUPED } from '../constants/common';
export const search = (items, term, arr) => {
  if (stryMutAct_9fa48("1")) {
    {}
  } else {
    stryCov_9fa48("1");
    const termTmp = stryMutAct_9fa48("2") ? term : (stryCov_9fa48("2"), term.trim());
    if (stryMutAct_9fa48("4") ? false : stryMutAct_9fa48("3") ? true : (stryCov_9fa48("3", "4"), isEmpty(termTmp))) return items;
    return stryMutAct_9fa48("5") ? items : (stryCov_9fa48("5"), items.filter(item => {
      if (stryMutAct_9fa48("6")) {
        {}
      } else {
        stryCov_9fa48("6");
        if (stryMutAct_9fa48("9") ? item.grouped || GROUPED.includes(termTmp.toLowerCase()) : stryMutAct_9fa48("8") ? false : stryMutAct_9fa48("7") ? true : (stryCov_9fa48("7", "8", "9"), item.grouped && GROUPED.includes(stryMutAct_9fa48("10") ? termTmp.toUpperCase() : (stryCov_9fa48("10"), termTmp.toLowerCase())))) return stryMutAct_9fa48("11") ? false : (stryCov_9fa48("11"), true);
        for (let i = 0; stryMutAct_9fa48("14") ? i >= arr.length : stryMutAct_9fa48("13") ? i <= arr.length : stryMutAct_9fa48("12") ? false : (stryCov_9fa48("12", "13", "14"), i < arr.length); stryMutAct_9fa48("15") ? i -= 1 : (stryCov_9fa48("15"), i += 1)) {
          if (stryMutAct_9fa48("16")) {
            {}
          } else {
            stryCov_9fa48("16");
            let data = item[arr[i]];
            if (stryMutAct_9fa48("18") ? false : stryMutAct_9fa48("17") ? true : (stryCov_9fa48("17", "18"), arr[i].includes(stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), '.')))) {
              if (stryMutAct_9fa48("20")) {
                {}
              } else {
                stryCov_9fa48("20");
                const [objectName, property] = arr[i].split(stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), '.'));
                data = stryMutAct_9fa48("22") ? item[objectName][property] : (stryCov_9fa48("22"), item[objectName]?.[property]);
              }
            }
            if (stryMutAct_9fa48("26") ? String(data).toLowerCase().indexOf(termTmp.toLowerCase()) <= -1 : stryMutAct_9fa48("25") ? String(data).toLowerCase().indexOf(termTmp.toLowerCase()) >= -1 : stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24", "25", "26"), (stryMutAct_9fa48("27") ? String(data).toUpperCase().indexOf(termTmp.toLowerCase()) : (stryCov_9fa48("27"), String(data).toLowerCase().indexOf(stryMutAct_9fa48("28") ? termTmp.toUpperCase() : (stryCov_9fa48("28"), termTmp.toLowerCase())))) > (stryMutAct_9fa48("29") ? +1 : (stryCov_9fa48("29"), -1)))) return stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30"), true);
          }
        }
        return stryMutAct_9fa48("31") ? true : (stryCov_9fa48("31"), false);
      }
    }));
  }
};