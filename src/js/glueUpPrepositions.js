function glueUpPrepositions(string) {
  const CONJUNCTIONS_AND_PREPOSITIONS_REGEXP = /(\s(а|без|в|вне|во|всё|где|да|для|до|ещё|ж|же|за|и|ибо|из|изо|или|к|как|ли|ль|меж|на|над|ни|но|о|об|обо|от|ото|по|под|про|раз|с|со|то|у|чем|что)\s)/g;
  if (string === null) {
    return '';
  }
  return string.replace(CONJUNCTIONS_AND_PREPOSITIONS_REGEXP, ' $2\xa0');
}

const typographyNodeList = document.getElementsByClassName('typography');
const typographyArray = Array.from(typographyNodeList);

typographyArray.forEach((typography) => {
  const typographyNodeChildren = typography.children;
  const typographyChildrenArray = Array.from(typographyNodeChildren);

  typographyChildrenArray.forEach((child) => {
    console.log('child', child);
    const childInnerHTML = child.innerHTML;
    const newChildInnerHTML = glueUpPrepositions(childInnerHTML);
    child.innerHTML = newChildInnerHTML;
    console.log(newChildInnerHTML);
  });
});
