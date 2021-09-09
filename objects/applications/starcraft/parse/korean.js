// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const sections = {
  'season': [
    [/시즌.([0-9]+)/, 'seasonNumber']
  ],
  'round_of': [
    [/([0-9]+)강/, 'roundNumber']
  ],
  'group_selection': [
    ['조추첨식']
  ],
  'group': [
    [/([a-zA-Z0-9])조/, 'groupName']
  ],
  'match': [
    [/([0-9]+)경기/, 'matchNumber']
  ],
  'set': [
    [/([0-9]+)세트/, 'setNumber']
  ],
  'view_all': [
    ['전체보기']
  ],
  'part': [
    [/Part.([0-9])/, 'partNumber']
  ],
  'finals': [
    ['결승전']
  ],
  'vs_matchup': [
    [/(\[)(.+?)vs(.+?)(\])?/i, null, 'playerA', 'playerB']
  ]
}

module.exports = {
  sections
}
