// assets/content-map.js

/* 站点内容分区、关键词标签与搜索过滤函数 */

const siteConfig = {
  baseUrl: "https://appindex-hth.com.cn",
  defaultSection: "home"
};

const sections = [
  { id: "home", title: "首页", tags: ["华体会", "首页", "概览"] },
  { id: "products", title: "产品", tags: ["华体会", "产品", "服务"] },
  { id: "blog", title: "博客", tags: ["华体会", "文章", "资讯"] },
  { id: "about", title: "关于", tags: ["华体会", "公司", "介绍"] }
];

// 关键词标签集合，用于快速匹配
const keywordTags = [
  { keyword: "华体会", sections: ["home", "products", "blog", "about"] },
  { keyword: "产品", sections: ["products"] },
  { keyword: "服务", sections: ["products"] },
  { keyword: "文章", sections: ["blog"] },
  { keyword: "资讯", sections: ["blog"] },
  { keyword: "公司", sections: ["about"] },
  { keyword: "介绍", sections: ["about"] },
  { keyword: "首页", sections: ["home"] },
  { keyword: "概览", sections: ["home"] }
];

// 搜索过滤函数：根据输入关键词返回匹配的分区列表
function searchSections(query) {
  if (!query || query.trim() === "") {
    return sections.filter(s => s.id !== "home"); // 默认不显示首页
  }

  const lowerQuery = query.toLowerCase().trim();
  const matchedSectionIds = new Set();

  // 遍历所有关键词标签，匹配输入
  for (const tag of keywordTags) {
    if (tag.keyword.toLowerCase().includes(lowerQuery)) {
      tag.sections.forEach(id => matchedSectionIds.add(id));
    }
  }

  // 同时检查分区标题是否包含关键词
  for (const section of sections) {
    if (section.title.toLowerCase().includes(lowerQuery)) {
      matchedSectionIds.add(section.id);
    }
  }

  // 返回匹配的分区对象数组
  return sections.filter(s => matchedSectionIds.has(s.id));
}

// 根据分区ID获取对应标签
function getTagsForSection(sectionId) {
  const section = sections.find(s => s.id === sectionId);
  return section ? section.tags : [];
}

// 获取所有可用关键词（用于提示或展示）
function getAllKeywords() {
  return keywordTags.map(t => t.keyword);
}

// 导出供其他模块使用（如果是在 Node/ESM 环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    sections,
    keywordTags,
    searchSections,
    getTagsForSection,
    getAllKeywords
  };
}