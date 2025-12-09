import { Difficulty, Language, Problem } from './types';

export const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: Difficulty.Easy,
    acceptance: '48.2%',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    starterCode: {
      [Language.Python]: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
      [Language.Java]: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      [Language.JavaScript]: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
};`
    }
  },
  {
    id: '2',
    title: 'Palindrome Number',
    slug: 'palindrome-number',
    difficulty: Difficulty.Easy,
    acceptance: '53.1%',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      }
    ],
    starterCode: {
      [Language.Python]: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        # Write your code here
        pass`,
      [Language.Java]: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        
    }
}`,
      [Language.JavaScript]: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Write your code here
};`
    }
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring',
    difficulty: Difficulty.Medium,
    acceptance: '33.8%',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    starterCode: {
      [Language.Python]: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
      [Language.Java]: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
      [Language.JavaScript]: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`
    }
  }
];