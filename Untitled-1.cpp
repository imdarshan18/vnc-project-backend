#include <bits/stdc++.h>
using namespace std;

int main()
{
    string keys;
    cout << "Enter key text";
    cin >> keys;
    int lenOfKey = keys.size();
    int flag = lenOfKey;
    string plainText;
    cout << "Enter plain Text";
    cin >> plainText;

    char matrix[5][5];
    unordered_map<char, int> map;
    for (char ch = 'a'; ch <= 26; ch++)
    {
        map[ch]++;
    }
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            if (flag == 0)
            {
                for (auto item : map)
                {
                    matrix[i][j] = item.first;
                }
            }
            else
            {
                matrix[i][j] = keys[i];
                map[keys[i]]--;
                flag--;
            }
        }
    }
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}