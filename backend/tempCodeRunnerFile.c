#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOGN = 20;
const int MOD = 1e9 + 7;

vector<int> adj[MAXN];
int parent[MAXN][LOGN], depth[MAXN];
int tin[MAXN], tout[MAXN], timer;
int chainHead[MAXN], chainInd[MAXN], posInBase[MAXN], baseArray[MAXN], ptr;
int segTree[4 * MAXN];
char letters[MAXN];

void dfs(int v, int p, int d) {
    tin[v] = ++timer;
    parent[v][0] = p;
    depth[v] = d;
    for (int i = 1; i < LOGN; i++)
        parent[v][i] = parent[parent[v][i-1]][i-1];
    for (int u : adj[v])
        if (u != p) dfs(u, v, d + 1);
    tout[v] = ++timer;
}

bool isAncestor(int u, int v) {
    return tin[u] <= tin[v] && tout[v] <= tout[u];
}

int lca(int u, int v) {
    if (isAncestor(u, v)) return u;
    if (isAncestor(v, u)) return v;
    for (int i = LOGN - 1; i >= 0; i--)
        if (!isAncestor(parent[u][i], v))
            u = parent[u][i];
    return parent[u][0];
}

void hld(int v, int p, int h) {
    chainHead[v] = h;
    chainInd[v] = ptr;
    posInBase[v] = ptr;
    baseArray[ptr++] = v;
    
    int heavyChild = -1, maxSubtree = -1;
    for (int u : adj[v]) {
        if (u != p) {
            int subtreeSize = tout[u] - tin[u] + 1;
            if (subtreeSize > maxSubtree) {
                maxSubtree = subtreeSize;
                heavyChild = u;
            }
        }
    }
    
    if (heavyChild != -1)
        hld(heavyChild, v, h);
    
    for (int u : adj[v])
        if (u != p && u != heavyChild)
            hld(u, v, u);
}

void buildSegTree(int node, int start, int end) {
    if (start == end) {
        segTree[node] = 1 << (letters[baseArray[start]] - 'a');
        return;
    }
    int mid = (start + end) / 2;
    buildSegTree(2*node, start, mid);
    buildSegTree(2*node+1, mid+1, end);
    segTree[node] = segTree[2*node] | segTree[2*node+1];
}

void updateSegTree(int node, int start, int end, int pos, char newLetter) {
    if (start == end) {
        segTree[node] = 1 << (newLetter - 'a');
        return;
    }
    int mid = (start + end) / 2;
    if (pos <= mid)
        updateSegTree(2*node, start, mid, pos, newLetter);
    else
        updateSegTree(2*node+1, mid+1, end, pos, newLetter);
    segTree[node] = segTree[2*node] | segTree[2*node+1];
}

int querySegTree(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return segTree[node];
    int mid = (start + end) / 2;
    return querySegTree(2*node, start, mid, l, r) | 
           querySegTree(2*node+1, mid+1, end, l, r);
}

int queryUp(int u, int v) {
    int result = 0;
    while (chainHead[u] != chainHead[v]) {
        result |= querySegTree(1, 0, ptr-1, posInBase[chainHead[u]], posInBase[u]);
        u = parent[chainHead[u]][0];
    }
    if (u != v)
        result |= querySegTree(1, 0, ptr-1, posInBase[v]+1, posInBase[u]);
    return result;
}

int query(int u, int v) {
    int l = lca(u, v);
    return __builtin_popcount(queryUp(u, l) | queryUp(v, l));
}

string trim(string s) {
    s.erase(s.begin(), find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !isspace(ch);
    }));
    s.erase(find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !isspace(ch);
    }).base(), s.end());
    return s;
}

vector<string> splitString(string s) {
    vector<string> result;
    istringstream iss(s);
    for (string s; iss >> s; )
        result.push_back(s);
    return result;
}

int get_ans(int N, int M, int two, string S, vector<vector<int>> E, int Q, int three, vector<vector<int>> Queries) {
    // Initialize global variables
    timer = 0;
    ptr = 0;
    for (int i = 0; i < N; i++) {
        adj[i].clear();
        letters[i] = S[i];
    }

    // Build adjacency list
    for (const auto& edge : E) {
        int u = edge[0] - 1, v = edge[1] - 1; // Convert to 0-based indexing
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Preprocess the tree
    dfs(0, 0, 0);
    hld(0, -1, 0);
    buildSegTree(1, 0, ptr-1);

    // Process queries
    long long result = 0;
    long long pow30 = 1;
    for (int i = 0; i < Q; i++) {
        int type = Queries[i][0], u = Queries[i][1] - 1, v = Queries[i][2]; // Convert to 0-based indexing
        if (type == 1) {
            char newLetter = 'a' + v - 1;
            updateSegTree(1, 0, ptr-1, posInBase[u], newLetter);
            letters[u] = newLetter;
        } else {
            v--; // Convert to 0-based indexing
            int distinctLetters = query(u, v);
            result = (result + distinctLetters * pow30) % MOD;
        }
        pow30 = (pow30 * 30) % MOD;
    }

    return result;
}

int main() {
    ios::sync_with_stdio(0); cin.tie(0); cout.tie(0);
    string inputLine;
    
    getline(cin, inputLine);
    int N = stoi(trim(inputLine));
    
    getline(cin, inputLine);
    int M = stoi(trim(inputLine));
    
    getline(cin, inputLine);
    int two = stoi(trim(inputLine));
    
    getline(cin, inputLine);
    string S = trim(inputLine);
    
    vector<vector<int>> E(M, vector<int>(two));
    for(int i=0; i<M; i++) {
        getline(cin, inputLine);
        vector<string> inputLineArr = splitString(trim(inputLine));
        for (int j=0; j<two; j++) {
            E[i][j] = stoi(inputLineArr[j]);
        }
    }
    
    getline(cin, inputLine);
    int Q = stoi(trim(inputLine));
    
    getline(cin, inputLine);
    int three = stoi(trim(inputLine));
    
    vector<vector<int>> Queries(Q, vector<int>(three));
    for(int i=0; i<Q; i++) {
        getline(cin, inputLine);
        vector<string> inputLineArr = splitString(trim(inputLine));
        for (int j=0; j<three; j++) {
            Queries[i][j] = stoi(inputLineArr[j]);
        }
    }
    
    int result = get_ans(N, M, two, S, E, Q, three, Queries);
    cout << result << endl;
    
    return 0;
}