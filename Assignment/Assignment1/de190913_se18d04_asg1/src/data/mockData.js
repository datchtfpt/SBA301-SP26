// Mock data - dùng tạm cho giao diện, sau sẽ thay bằng API từ BE

export const mockCategories = [
  { CategoryID: 1, CategoryName: 'Thế giới', CategoryDesciption: 'Tin tức thế giới', ParentCategoryID: null, IsActive: 1 },
  { CategoryID: 2, CategoryName: 'Công nghệ', CategoryDesciption: 'Tin công nghệ', ParentCategoryID: null, IsActive: 1 },
  { CategoryID: 3, CategoryName: 'Thể thao', CategoryDesciption: 'Tin thể thao', ParentCategoryID: null, IsActive: 1 },
];

export const mockTags = [
  { TagID: 1, TagName: 'Hot', Note: 'Tin nổi bật' },
  { TagID: 2, TagName: 'Mới', Note: 'Tin mới' },
  { TagID: 3, TagName: 'Ưu tiên', Note: '' },
];

export const mockAccounts = [
  { AccountID: 1, AccountName: 'Admin', AccountEmail: 'admin@fu.edu.vn', AccountRole: 1 },
  { AccountID: 2, AccountName: 'Staff01', AccountEmail: 'staff01@fu.edu.vn', AccountRole: 2 },
  { AccountID: 3, AccountName: 'Staff02', AccountEmail: 'staff02@fu.edu.vn', AccountRole: 2 },
];

export const mockNews = [
  {
    NewsArticleID: 1,
    NewsTitle: 'Tin mẫu số 1',
    Headline: 'Tóm tắt tin số 1',
    CreatedDate: '2025-02-01T10:00:00',
    NewsContent: 'Nội dung chi tiết tin số 1...',
    NewsSource: 'FU News',
    CategoryID: 1,
    NewsStatus: 1,
    CreatedByID: 1,
    tagIds: [1, 2],
  },
  {
    NewsArticleID: 2,
    NewsTitle: 'Tin mẫu số 2',
    Headline: 'Tóm tắt tin số 2',
    CreatedDate: '2025-02-02T11:00:00',
    NewsContent: 'Nội dung chi tiết tin số 2...',
    NewsSource: 'FU News',
    CategoryID: 2,
    NewsStatus: 1,
    CreatedByID: 2,
    tagIds: [2, 3],
  },
];

// Role: 1 = Admin, 2 = Staff
export const ROLE_ADMIN = 1;
export const ROLE_STAFF = 2;
