/**
 * @param hash 哈希值
 * @param gitTag 标签
 * @param committerDate 提交时间
 * @param authorName 提交人
 * @param authorEmail 邮箱
 */
module.exports = {
  format:
    '%B%n-hash-%n%H%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae'
}