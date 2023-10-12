import { StyleSheet } from 'react-native'
import { setStatusBarHeight } from 'utils/util'

const global = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarHeight: {
    height: setStatusBarHeight(),
  },
  statusBarPaddingTop: {
    backgroundColor: '#fff',
    paddingTop: setStatusBarHeight(),
  },
  rowFlexBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlexStartCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowFlexAroundCenter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  columnStartCenter: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  columnBetweenCenter: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  columnCenterCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionItem: {
    position: 'relative',
  },
  topBg: {
    paddingTop: setStatusBarHeight(),
    paddingHorizontal: 16,
  },
  space: {
    height: 10,
    backgroundColor: '#F6F7F9',
  },
  onlyBottomLine: {
    borderBottomColor: 'rgba(237, 237, 237, 1)',
    borderBottomWidth: 0.5,
  },
  titleBotttomLine: {
    borderBottomColor: 'rgba(217, 217, 217, 1)',
    borderBottomWidth: 1,
  },
  emptyIcon: {
    width: 167,
    height: 78.25,
  },
  listFooterTips: {
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(153, 153, 153, 1)',
    paddingVertical: 20,
  },
})
export default global
